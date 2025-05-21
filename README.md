# Ironsworn Character Generator

A web application that generates random characters for the Ironsworn tabletop role-playing game, built with TypeScript and the CMS Design System.

## Features

- Randomly generates character names
- Assigns stats according to Ironsworn rules (Edge, Heart, Iron, Shadow, Wits)
- Creates character backgrounds
- Assigns character assets with abilities
- Tracks character condition meters (Health, Spirit, Supply, Momentum)
- Manages bonds with progress tracks
- Tracks vows with rank and progress
- Editable fields for customization
- Checkbox-based progress tracking

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone this repository or download the files
2. Navigate to the project directory
3. Install dependencies:

```
npm install
```

### Running the Application

To start the development server:

```
npm start
```

This will start the application at `http://localhost:1234`

### Building for Production

To build the application for production:

```
npm run build
```

## Project Structure

- `index.html` - Main HTML file using CMS Design System components
- `src/app.ts` - Main application logic and UI interactions
- `src/generator.ts` - Character generation logic
- `src/types.ts` - TypeScript interfaces and data definitions
- `src/styles.css` - Custom styling that complements CMS Design System

## Technologies Used

- TypeScript for type-safe JavaScript
- Parcel for bundling and development server
- [CMS Design System](https://design.cms.gov/) for UI components and styling
- Custom checkbox-based progress tracking system

## Usage

1. Click "Generate Character" to create a random Ironsworn character
2. Edit any fields as needed to customize your character
3. Use "Manage Assets" to select character abilities
4. Add bonds and vows to track relationships and goals
5. Use the checkbox tracks to monitor character progress

## License

This project is open source and available under the MIT License.