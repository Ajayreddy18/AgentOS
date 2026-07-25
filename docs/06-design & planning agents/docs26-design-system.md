# AgentOS – Design System

Version: 1.0

Status: Version 1.0

Owner: Ajay Reddy

Last Updated: July 2026

---

# Document Purpose

This document defines the visual language and reusable design principles for AgentOS Version 1.

It establishes a consistent foundation for colors, typography, spacing, components, icons, layouts, and interaction patterns.

The design system ensures a unified user experience across the entire application.

---

# Design Principles

The design system should be:

- Consistent
- Accessible
- Modern
- Minimal
- Scalable
- Developer-friendly

Every UI component should follow these principles.

---

# Design Philosophy

AgentOS is a productivity platform.

The interface should:

- Prioritize content over decoration.
- Reduce cognitive load.
- Keep actions predictable.
- Provide immediate visual feedback.
- Maintain consistency across screens.

---

# Color Palette

## Primary

Used for primary actions and branding.

```
Primary-50
Primary-100
Primary-200
Primary-300
Primary-400
Primary-500
Primary-600
Primary-700
Primary-800
Primary-900
```

---

## Neutral

Used for backgrounds, borders, text, and surfaces.

```
Gray-50
Gray-100
Gray-200
Gray-300
Gray-400
Gray-500
Gray-600
Gray-700
Gray-800
Gray-900
```

---

## Semantic Colors

Success

```
Green
```

Warning

```
Yellow
```

Error

```
Red
```

Information

```
Blue
```

These colors should only communicate meaning.

---

# Typography

Primary Font

Inter

Fallback

System Sans Serif

---

## Font Scale

```
Display

Heading 1

Heading 2

Heading 3

Heading 4

Body Large

Body

Body Small

Caption

Code
```

Use a consistent type scale throughout the application.

---

# Spacing System

Use an 8-point spacing system.

Examples

```
4 px

8 px

16 px

24 px

32 px

40 px

48 px

64 px
```

Avoid arbitrary spacing values.

---

# Border Radius

Small

```
4 px
```

Medium

```
8 px
```

Large

```
12 px
```

Extra Large

```
16 px
```

Cards, dialogs, and inputs should use consistent radius values.

---

# Shadows

Small

Cards

Medium

Dropdowns

Large

Modals

Use subtle shadows to maintain a clean appearance.

---

# Icons

Use one icon library consistently.

Examples

- Navigation
- Actions
- Notifications
- Files
- Agents
- Search

Icons should have consistent sizing.

---

# Buttons

Variants

- Primary
- Secondary
- Outline
- Ghost
- Destructive

States

- Default
- Hover
- Active
- Disabled
- Loading

Buttons should clearly indicate interaction state.

---

# Inputs

Supported fields

- Text
- Password
- Search
- Textarea
- Select
- Checkbox
- Radio
- Toggle

Each input should support:

- Label
- Placeholder
- Helper text
- Validation message

---

# Cards

Cards should display:

- Title
- Description
- Metadata
- Actions

Cards should use consistent spacing and elevation.

---

# Navigation

Sidebar

- Fixed
- Collapsible
- Active item highlighted

Top Navigation

- Logo
- Search
- Project Selector
- Notifications
- User Menu

---

# Tables

Tables should support:

- Sorting
- Pagination
- Search
- Filtering

Rows should remain readable on smaller screens.

---

# Modals

Use modals for:

- Confirmation
- Forms
- Quick actions

Modals should:

- Trap keyboard focus.
- Be dismissible.
- Clearly indicate primary actions.

---

# Toast Notifications

Types

- Success
- Error
- Warning
- Information

Toasts should:

- Auto-dismiss when appropriate.
- Support manual dismissal.

---

# Loading States

Use:

- Skeleton loaders
- Progress bars
- Loading spinners

Avoid blank interfaces.

---

# Empty States

Examples

- No Projects
- No Files
- No Conversations

Each empty state should include a helpful action.

---

# Error States

Errors should include:

- Clear explanation
- Suggested next step
- Retry option where appropriate

---

# Responsive Design

Breakpoints

- Mobile
- Tablet
- Desktop
- Large Desktop

Components should adapt gracefully across screen sizes.

---

# Accessibility

All components should:

- Support keyboard navigation.
- Include ARIA attributes where needed.
- Maintain sufficient color contrast.
- Display visible focus indicators.

Accessibility should be considered during component development.

---

# Theme Support

Version 1 supports:

- Light Theme
- Dark Theme

User preference should persist across sessions.

---

# Motion

Animations should be:

- Fast
- Subtle
- Purposeful

Avoid excessive motion.

---

# Component Naming

Use consistent naming.

Examples

Button

Card

Input

Modal

ProjectCard

ConversationItem

MemoryCard

AgentStatus

---

# Reusability Guidelines

Components should:

- Be composable.
- Avoid duplicated logic.
- Accept configurable properties.
- Be independently testable.

---

# Design Tokens

Future implementation should centralize:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Animation durations

These tokens should be shared across all frontend components.

---

# Future Enhancements

Future versions may include:

- Custom themes
- User-defined accent colors
- Density settings
- Advanced accessibility options

---

# Conclusion

The AgentOS Design System provides a consistent visual and interaction foundation for the application.

By standardizing design decisions, the system improves usability, accelerates frontend development, and ensures a cohesive experience across all features.
