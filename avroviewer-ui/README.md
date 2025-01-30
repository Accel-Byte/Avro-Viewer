# Avro Viewer Webview UI

Webview UI for the Avro Viewer VS Code extension. Built using **React**, **Vite**, and **Tailwind CSS**, for visualizing Avro data within VS Code.

## Features

- **Table View with Pagination**: Displays Avro data in an easy-to-navigate table format.
- **Column-Based Search**: Allows filtering data based on a specific column.
- **Theming Support**: Supports 5 different themes, including dark mode.
- **Integrated with VS Code API**: Seamlessly communicates with the extension backend for loading Avro files.

## Tech Stack

- **React**: Component-based UI development.
- **Vite**: Fast build tool for optimized performance.
- **Tailwind CSS**: Utility-first styling for flexible design.
- **VS Code API**: Interacts with the extension to fetch and display Avro data.

## Setup & Development

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd webview-ui
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server(you can experiment with dummy data):
   ````sh
   npm run dev
   ```)
   ````
4. Build for production:
   ```sh
   npm run build
   ```

## Usage

- The webview UI is automatically loaded when an Avro file is opened in the VS Code extension.
- Pagination controls help navigate large datasets.
- Use the search bar to filter results dynamically.
- Change themes via the settings menu.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Enjoy using Avro Viewer! 🚀
