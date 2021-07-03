const materialDarkTheme = {
     darkText: "#131A20",
     primary: "#90CAF9",
}
const antdTheme = {
     antdDarkBase: "#111D2C",
}

const materialSuggestedTheme = {
     darkBase: "#141414",
     darkSurfac5: "#161616",
     darkSurface2: "#223040",
     darkSurface3: "#1e2b3b",
     darkSurface4: "#111D2C",
     darkBaseAppBarPale: "#111d2c",
     blueSecondary: "#64b6fa",
     darkPrimary: "#177ddc",
     darkSecondary: "#64b6fa",
     pinkSecondary: "#F291B5",
     darkMenuBackground2: "#323d4a",
     dp01: "#1e1e1e",
     dp02: "#222222",
     dp03: "#252525",
     dp04: "#272727",
     dp06: "#2c2c2c",
     dp08: "#2d2d2d",
     dp12: "#333333",
     dp16: "#363636",
     dp24: "#383838",
     dp48: "#505050",
}

const draftTheme = {
     darkBaseAppBar2: "#F291B5",
}

const globalConfig = {
     spriteDrawerWidth: 270,
     storyboardDrawerWidth: 240,
     toolBarHeight: 48,
     addNewSpriteBoxHeight: 50,

     storyboardMenuColor: {
          titleBar: {
               background: materialDarkTheme.primary,
               text: materialDarkTheme.darkText
          },
          surface: "#111D2C",
          menuHeader: "#2a2e33",
          menuItem: "#353a40",
          menuBackground: "#121c29",
          menuItemOnClick: {
               background: materialDarkTheme.primary,
               text: materialDarkTheme.darkText
          },
          menuBackgroundOnDrag: "#e6f7ff",
          whiteText: "white",
     },
}

Object.freeze(globalConfig);

export  default globalConfig;

