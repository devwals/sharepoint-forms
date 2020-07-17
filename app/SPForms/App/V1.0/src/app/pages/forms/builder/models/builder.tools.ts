
export const BuilderTools = [
    {
        name: 'Label', label: 'Label', type: 'label', group: "General",
        icon: 'fas fa-tag', 'input': true
    },

    {
        name: 'Textbox', label: 'Textbox', type: 'textfield', group: "General",
        icon: 'fas fa-language', 'input': true
    },

    {
        name: 'PlainTextMultiLine', label: 'Plain Text Multi Line', group: "General",
        type: 'textfieldmulti', icon: 'fas fa-text-height',
        'input': true
    },

    {
        name: 'RichText', label: 'RichText', type: 'richtext', group: "General",
        icon: 'fas fa-font', 'input': true
    },

    {
        name: 'Number', label: 'Number', type: 'number', group: "General",
        icon: 'fas fa-hashtag', 'input': true
    },

    {
        name: 'YesNo', label: 'Yes / No', type: 'yesno', group: "General",
        icon: 'fas fa-check-circle', 'input': true
    },

    {
        name: 'Choice', label: 'Choice', type: 'choice', group: "General",
        icon: 'fas fa-check-double', 'input': true
    },

    // {
    //     name: 'Dropdown', label: 'Dropdown', type: 'dropdown', group: "General",
    //     icon: 'fas fa-angle-double-down', 'input': true
    // },

    {
        name: 'Image', label: 'Image', type: 'image', group: "General",
        icon: 'fas fa-image', 'input': true
    },

    {
        name: 'People', label: 'People', type: 'user', group: "SharePoint",
        icon: 'fas fa-users', 'input': true
    },

    {
        name: 'Managed Metadata', label: 'Managed Metadata', type: 'managedmetadata',
        group: "SharePoint", icon: 'fas fa-tags', 'input': true
    },

    // {
    //     name: 'ListLookup', label: 'List Lookup', type: 'listlookup', group: "SharePoint",
    //     icon: 'fas fa-search-plus',   'input': true
    // },

    // {
    //     name: 'Panel', label: 'Panel', type: 'panel', group: "Layout",
    //     icon: 'fas fa-code',   'input': true
    // },

    {
        name: 'Attachment', label: "Attach File", group: "SharePoint",
        type: 'attachment', icon: 'far fa-file'
    },

    {
        name: 'DocumentUpload', label: "Document Upload", group: "SharePoint",
        type: 'document', icon: 'fas fa-file-upload'
    },

    {
        name: 'Link', label: 'Link', type: 'link', group: "General",
        icon: 'fas fa-link'
    },

    {
        name: 'Button', label: "Button", type: 'button', group: "General",
        icon: 'fas fa-square', readOnly: false
    },

    // {
    //     name: 'Section', label: "Section", children: [] as any[], type: 'section', group: "Layout",
    //     icon: 'fas fa-plus-square'
    // },

    // {
    //     name: 'Tabs', label: "Tabs",
    //     children: [
    //         { name: 'Tab', label: 'Tab 1', type: 'tab', children: [] as any[], active: true },
    //         { name: 'Tab', label: 'Tab 2', type: 'tab', children: [] as any[], active: false }
    //     ] as any[],
    //     type: 'tabs', group: "Layout",
    //     icon: 'fas fa-plus-square'
    // },

    {
        name: 'Columns', label: "Columns",
        children: [
            { name: 'Column', label: 'Column', type: 'column', children: [] as any[] },
            { name: 'Column', label: 'Column', type: 'column', children: [] as any[] }
        ] as any[],
        children1: [] as any[], children2: [] as any[],
        group: "Layout", type: 'columns', icon: 'fas fa-columns'
    },
    {
        name: 'HorizontalLine', label: "Horizontal Line", group: "Layout",
        type: 'horizontalline', icon: 'fas fa-ruler-horizontal'
    },
    {
        name: 'VerticalLine', label: "Vertical Line", group: "Layout",
        type: 'verticalline', icon: 'fas fa-ruler-vertical'
    },
    {
        name: 'Date', label: 'Date', type: 'date', group: "General",
        icon: 'far fa-calendar', 'input': true
    },
    {
        name: 'DateTime', label: 'Date Time', type: 'datetime', group: "General",
        icon: 'far fa-clock', 'input': true
    },
    {
        name: 'Lookup', label: 'Lookup', type: 'lookup', group: "SharePoint",
        icon: 'fas fa-external-link-alt', 'input': true
    },
    // {
    //     name: 'Nested Form', label: "Nested Form", children: [] as any[], type: 'nestedForm', group: "Layout",
    //     icon: 'fab fa-wpforms'
    // },

    // {
    //     name: 'Computed', label: 'Computed', type: 'computed', group: "SharePoint",
    //     icon: 'fas fa-language',   'input': true
    // },
    // {
    //     name: 'Calculated', label: 'Calculated', type: 'calculated', group: "SharePoint",
    //     icon: 'fas fa-calculator',   'input': true
    // }

];
