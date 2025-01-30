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

![Avro viewer table](./images/avro%20viewer%20table.png)

### Theme Switching

![Rose Theme](./images/rose%20theme.png)

### Dark Mode

![Dark Mode](./images/dark%20mode.png)

### Column Search

![Specific Column Search](./images/specific%20column%20search.png)

### Pagination

![Pagination](./images/records%20with%20pagination.png)

### Full Schema View

![Schema Modal](./images/schema%20modal.png)

### Full Schema Dark Mode

![Schema Modal Dark Mode](./images/schema%20modal%20dark.png)

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Enjoy using Avro Viewer! 🚀
