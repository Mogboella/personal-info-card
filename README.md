# Personal Info Card - Project Documentation

## Overview

The Personal Info Card is a React Project that allows users to store and manage their frequently used personal information for job applications. The component provides an editable card interface with copy functionality for easy reuse of information.

## Features

### Current Features

- **Editable Personal Information Card**:

  - Name (first and last)
  - Email address
  - Phone number (with country code)
  - Full address (line1, line2, town, county, eircode)
  - Multiple links (name + URL pairs)


- **Copy Functionality**:

  - One-click copy buttons for each information field
  - Formatted address copying
  - Direct URL copying for links


- **Edit/Save Toggle**:

  - Floating Action Button (FAB) for switching between view and edit modes
  - Form validation during editing


- **Responsive Design**:

  - Adapts to different screen sizes
  - Mobile-friendly layout


### Future Iteration Plans

- **OAuth Integration**: Secure authentication for user accounts
- **Custom Fields**: Allow users to add additional information fields
- **Format Customization**:
  - Custom formatting for addresses
  - Phone number formatting options


- **Enhanced Link Management**: Improved link organization and display

## Component Structure

### Main Component: `EditableInfoCard`

The core component that renders the personal information card and handles all functionality.

#### Props

- `info` (Object): Initial personal information data
- `onSave` (Function): Callback when user saves edited information

#### State Management

- `editMode` (Boolean): Toggles between view and edit modes
- `formData` (Object): Stores the current information data
- `newLink` (Object): Temporary storage for new links being added

## Usage

### Installation

```bash
npm install
```

### Implementation

```bash
npm run dev
```

## Styling

The component uses Material-UI's styling system with some customizations:

- Fixed width card (max 500px)
- Responsive grid layout
- Floating action buttons for edit/save
- Consistent spacing and typography

## Development Roadmap

### Short-term Goals

1. Add local storage persistence
2. Implement basic authentication
3. Add field validation

### Medium-term Goals

1. Custom field configuration
2. Address formatting options
3. Export/import functionality

### Long-term Goals

1. OAuth integration
2. Cloud sync across devices
3. Browser extension version

## Contribution Guidelines

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with clear description of changes
4. Ensure all tests pass
5. Maintain consistent code style

## License

MIT License
