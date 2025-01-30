# Avro Viewer - VS Code Extension

Avro Viewer is a VS Code extension that allows users to open Avro files and display their contents in a structured table format. The extension provides pagination, column-based search, and theme customization, making it easier to explore Avro data within the VS Code environment.

## Features

- **Avro File Support**: Select and open Avro files directly from the VS Code explorer.
- **Table View**: Data is displayed in a paginated table format.
- **Column-Based Search**: Quickly filter data by searching within specific columns.
- **Dark Mode & Themes**: Choose from 5 different themes, including dark mode.
- **Built with React & Tailwind**: Provides a modern and responsive UI.
- **Default Codec Support**: Uses the `avsc` library for decoding Avro files.

## Upcoming Features

- **Streaming Support**: Handle larger Avro files efficiently.
- **Additional Codec Support**: Support for multiple Avro compression codecs.
- **Regex Queries**: Advanced search using regular expressions on Avro data.
- **More Nested Records**: At present we are only supporting depth level 2 (i.e. only one nested record). Expand support for more depth.

## Installation

1. Open VS Code and go to the Extensions Marketplace.
2. Search for `Avro Viewer`.
3. Click **Install**.

## Usage

1. **Opening a File**:
   1. Select an Avro file from the VS Code explorer or use (`Ctrl+Shift+P` for windows and linux, `⌘ + Shift + P` for mac) and run `Avro Viewer: Open Avro File`.
   2. Or Right-click an Avro file in the Explorer and select `Open Avro File`.
2. **Navigating Data**: Use pagination controls to browse large datasets.
3. **Searching Data**: Use the search bar to filter results by a specific column.
4. **Changing Theme**: Select a preferred theme for better readability.

## Snapshot

### Avro viewer table

![Avro viewer table](https://github.com/Accel-Byte/Avro-Viewer/blob/main/images/avro-viewer-table.png?raw=true)

### Theme Switching

![Rose Theme](https://github.com/Accel-Byte/Avro-Viewer/blob/main/images/rose-theme.png?raw=true)

### Dark Mode

![Dark Mode](https://github.com/Accel-Byte/Avro-Viewer/blob/main/images/dark-mode.png?raw=true)

### Column Search

![Specific Column Search](https://github.com/Accel-Byte/Avro-Viewer/blob/main/images/specific-column-search.png?raw=true)

### Pagination

![Pagination](https://github.com/Accel-Byte/Avro-Viewer/blob/main/images/records-with-pagination.png?raw=true)

### Full Schema View

![Schema Modal](https://github.com/Accel-Byte/Avro-Viewer/blob/main/images/schema-modal.png?raw=true)

### Full Schema Dark Mode

![Schema Modal Dark Mode](https://github.com/Accel-Byte/Avro-Viewer/blob/main/images/schema-modal-dark.png?raw=true)

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Enjoy using Avro Viewer! 🚀
