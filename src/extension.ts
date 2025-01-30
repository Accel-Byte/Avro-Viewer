import * as vscode from "vscode";
import * as avro from "avsc";
import { AvroViewerPanel } from "./panels/AvroViewerPanel";

import * as fs from "fs";
import { AvroRecord } from "./type";

function processAvroFile(filePath: string): Promise<{
  schema: avro.Schema;
  schemaFields: avro.types.Field[];
  records: AvroRecord[];
}> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const decoder = new avro.streams.BlockDecoder();
    let schemaFields: avro.types.Field[] | null = null;
    let schema: avro.Schema | null = null;
    const records: AvroRecord[] = [];

    fileStream.pipe(decoder);

    decoder.on("metadata", (metadata: avro.Schema) => {
      try {
        if (!(metadata instanceof avro.types.RecordType)) {
          throw new Error("The Avro file must be a record file.");
        }
        schemaFields = metadata.fields;
        schema = metadata;
      } catch (err) {
        fileStream.destroy();
        reject(err);
      }
    });

    decoder.on("data", (record: AvroRecord) => {
      records.push(record);
    });

    decoder.on("end", () => {
      if (schema && schemaFields && records.length) {
        resolve({ schema, schemaFields, records });
      } else {
        reject(new Error("Schema or records not found in Avro file."));
      }
    });

    decoder.on("error", (err: Error) => reject(err));
  });
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "avroviewer.openAvroFile",
    async (uri: vscode.Uri) => {
      const fileUri = uri || (await getAvroFileUri());
      if (!fileUri) return;

      try {
        const { schema, schemaFields, records } = await processAvroFile(
          fileUri.fsPath
        );
        validateSchema(schemaFields);

        const { headerValues, rowValues } = extractTableData(
          schemaFields,
          records
        );

        AvroViewerPanel.render(context.extensionUri);
        AvroViewerPanel.currentPanel?.sendMessage({
          schema: JSON.stringify(schema),
          headerValues,
          rowValues,
        });
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

async function getAvroFileUri(): Promise<vscode.Uri | undefined> {
  const fileUris = await vscode.window.showOpenDialog({
    canSelectMany: false,
    filters: {
      "Avro Files": ["avro"],
      "All Files": ["*"],
    },
  });
  return fileUris?.[0];
}

/**
 * Validates the Avro schema and throws an error if nested avro records(more than 2 level) found.
 */
function validateSchema(schema: avro.types.Field[], depth: number = 1): void {
  for (const field of schema) {
    if (field.type instanceof avro.types.RecordType) {
      if (depth >= 2) {
        throw new Error(
          "Nested Avro records deeper than depth = 2 are not supported!"
        );
      }
      validateSchema(field.type.fields, depth + 1);
    }
  }
}

/**
 * Extracts header values from the schema, including nested fields.
 */
function extractHeaderValues(
  schema: avro.types.Field[],
  prefix: string = ""
): string[] {
  const headers: string[] = [];
  for (const field of schema) {
    const fieldName = prefix ? `${prefix}.${field.name}` : field.name;
    if (field.type instanceof avro.types.RecordType) {
      // Recursively extract nested field headers
      headers.push(...extractHeaderValues(field.type.fields, fieldName));
    } else {
      headers.push(fieldName);
    }
  }
  return headers;
}

/**
 * Extracts row values from the records, flattening nested fields.
 */
function extractRowValues(
  records: AvroRecord[],
  headers: string[]
): AvroRecord[] {
  return records.map((record) => {
    const flattenedRecord: AvroRecord = {};
    for (const header of headers) {
      const fieldPath = header.split(".");
      flattenedRecord[header] = getNestedValue(record, fieldPath) ?? "";
    }
    return flattenedRecord;
  });
}

/**
 * Retrieves a nested value from an object based on a path.
 */
function getNestedValue(obj: AvroRecord, path: string[]): any {
  return path.reduce(
    (value, key) =>
      value && typeof value === "object" ? value[key] : undefined,
    obj
  );
}

/**
 * Extracts header and row values from the schema and records for rendering.
 */
function extractTableData(
  schema: avro.types.Field[],
  records: AvroRecord[]
): { headerValues: string[]; rowValues: AvroRecord[] } {
  const headerValues = extractHeaderValues(schema);

  const rowValues = extractRowValues(records, headerValues);

  return { headerValues, rowValues };
}

export function deactivate() {}
