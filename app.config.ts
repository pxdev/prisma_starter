export default defineAppConfig({
    appConfig: {
        name: 'Prisma',
    },
    ui: {
        primary: 'theme-color',
        gray: 'neutral',
        container: {
          constrained: 'max-w-[90%]',
        },
        slideover: {
            overlay: {
                background: 'bg-gray-900/70',
            },
        },
        modal: {
            overlay: {
                background: 'bg-gray-900/70',
            },
        },

        formGroup: {
            base: 'font-noto',
            error: 'text-xs text-red-500 dark:text-red-400',
            label: {
                base: 'text-xs block font-bold text-gray-700 dark:text-gray-200',
            },
        },
        card: {
            shadow: '',
            base: '',
        },
        input: {
            color: {
                white: {
                    outline: 'shadow-none ring-gray-300/80 dark:ring-gray-700/60',
                },
            },
        },
        select: {
            color: {
                white: {
                    outline: 'shadow-none ring-gray-300/80 dark:ring-gray-700/60',
                },
            },
        },
        textarea: {
            color: {
                white: {
                    outline: 'shadow-none ring-gray-300/80 dark:ring-gray-700/60',
                },
            },
        },
        selectMenu: {},
        table: {
            base: 'min-w-full table-fixed',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            tbody: 'divide-y divide-gray-100 dark:divide-gray-800',
            thead: 'hidden lg:table-header-group',
            default: {
                sortButton: {
                    icon: 'i-solar-sort-vertical-outline print:hidden',
                },
            },
            tr: {
                base: 'transition hover:bg-gray-50/40 dark:hover:bg-gray-800/40',
            },
            th: {
                padding: 'py-4 px-3',
                size: 'text-sm',
                font: 'font-medium',
            },
            td: {
                base: 'truncate block lg:table-cell',
                padding: 'print:px-0 print:py-0 px-3 py-4',
            },
            checkbox: {
                padding: 'ps-4 print:hidden',
            },
        },
    },
})
