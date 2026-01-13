{
"project_name": "MRO Dashboard (Qiespend)",
"framework_stack": {
"core": "Vue.js 3 (Composition API)",
"styling": "Tailwind CSS",
"datagrid": "Tabulator (tabulator-tables)",
"icons": "Lucide Vue / Heroicons"
},
"design_system": {
"theme_modes": ["dark", "light"],
"spacing_scale": "Tailwind-standard (4px increments)",
"border_radius": {
"base": "12px",
"card": "16px",
"button": "8px",
"pill": "9999px"
},
"typography": {
"primary_font": "Inter or Geist Sans",
"weights": {
"regular": 400,
"medium": 500,
"semibold": 600,
"bold": 700
}
}
},
"color_palette": {
"primary": {
"DEFAULT": "#051766", // Dark blue
"foreground": "#000000"
},
"secondary": {
"DEFAULT": "#1E1E1E", // Card Background
"hover": "#2A2A2A"
},
"grays": {
"900": "#0D0D0D", // Page Background (Dark)
"800": "#161616", // Sidebar Background
"700": "#262626", // Border/Stroke
"400": "#A3A3A3", // Muted Text
"100": "#FFFFFF" // Primary Text (Dark Mode)
},
"status": {
"success": "#10B981", // Emerald
"error": "#EF4444", // Red
"info": "#3B82F6" // Blue
},
"complex_media": {
"card_gradient": "linear-gradient(135deg, #1A1A1A 0%, #000000 100%)",
"visa_glow": "radial-gradient(circle at top right, rgba(217, 255, 33, 0.15), transparent)",
"chart_highlight": "drop-shadow(0px 0px 8px rgba(217, 255, 33, 0.5))"
}
},
"tabulator_config": {
"theme_integration": "Custom CSS variables mapping to Tailwind colors",
"features": {
"pagination": "Remote or Local (8 rows per page)",
"responsive_layout": "collapse",
"sorting": true,
"custom_formatters": [
"Status Badge Formatter",
"Avatar + Name Inline Formatter",
"Currency Formatter"
]
}
},
"layout_structure": {
"sidebar": {
"width": "260px",
"behavior": "fixed-left",
"sections": ["Menu", "Features", "Tools"],
"promo_card": "Upgrade Pro widget with blurred background effect"
},
"main_content": {
"max_width": "1440px",
"padding": "24px",
"grid": {
"kpi_row": "3-column grid",
"analytics_row": "2-column layout (Left: Spending Limits / Right: Balance Chart)",
"table_section": "Full-width scrollable container"
}
}
},
"responsive_breakpoints": {
"sm": "640px", // Mobile: Sidebar hidden (hamburger), single-column stack.
"md": "768px", // Tablet: Sidebar collapsed to icons, 2-column cards.
"lg": "1024px", // Laptop: Sidebar expanded, full grid layout.
"xl": "1280px", // Desktop: Optimized spacing/max-widths.
"2xl": "1536px" // Large Display: Sidebar fixed, expanded view.
},
"components": {
"kpi_card": {
"props": ["label", "value", "trend"],
"style": "Bordered, subtle top-inner-shadow"
},
"spending_limits": {
"visualization": "Horizontal segmented progress bars with percentage indicators"
},
"balance_chart": {
"type": "Bar Chart",
"active_state": "Primary Lime highlight for the current month (April)"
},
"transaction_table": {
"features": ["Row selection", "Status badges", "User avatars", "Pagination"],
"border_style": "Bottom-only separator, #262626"
}
}
}
