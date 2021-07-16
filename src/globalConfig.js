import {createMuiTheme} from "@material-ui/core";

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


console.log(window.innerWidth);
console.log(window.innerHeight);


let mode = "LARGE"

if (window.innerWidth < 1380) {
     mode = "SMALL"
}

if (window.innerWidth >= 1380 && window.innerWidth < 1600 ) {
     mode = "MEDIUM"
}

let responsiveSizeData = {
     actorDrawerWidth: 270,
     storyboardDrawerWidth: 240,
     noteWidth: 335,
     frameListHeight: 200,
}

if (mode === "MEDIUM") {
     responsiveSizeData.frameListHeight = 150
}

if (mode === "SMALL") {
     responsiveSizeData = {
          actorDrawerWidth: 200,
          storyboardDrawerWidth: 200,
          noteWidth: 230,
          frameListHeight: 130
     }
}

const globalConfig = {
     // actorDrawerWidth: 270,
     // storyboardDrawerWidth: 240,
     toolBarHeight: 48,
     storyboardPageMargin: 8,
     storyboardToolBarHeight: 40,
     addNewActorBoxHeight: 50,
     projectDrawerWidth: 270,
     panelTabsWidth: 65,
     // noteWidth: 335,
     // responsiveSizeData.frameListHeight: 200,
     trashToolBarHeight: 35,
     innerBoxLeftRightPaddingEach: 20,
     topAndBottomMarginOutsideFrame: 5,
     noScaleWidth: 488,

     color: {
          veryLightGrey: "#fafafa",
     },

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
     dashboardTheme: ()=> createMuiTheme({
          palette: {
               secondary: {
                    main: "#1890ff",
               },
          },
     }),
     routes: {
          dashboard: "/project",
          login: "/login",
     },
     types: {
          DRAFT: false,
          FINAL: true,
     },
     imageServer: {
          "student": {
               "state": "static/student/state/",
               "backdrop": "static/student/backdrop/",
               "frame": "static/student/frame/",
          },
          "sample": {
               "state": "static/sample/state/",
               "backdrop": "static/sample/backdrop/",
               "frame": "static/sample/frame/",
          }
     }
}

globalConfig.mode = mode;
globalConfig.responsiveSizeData = responsiveSizeData;


const calcFrameWidth = ( windowInnerWidth, windowInnerHeight ) => {
     const bestFrameHeight = (windowInnerHeight
         - globalConfig.toolBarHeight
         - globalConfig.storyboardToolBarHeight
         - globalConfig.storyboardPageMargin*2
         - globalConfig.responsiveSizeData.frameListHeight
         - globalConfig.topAndBottomMarginOutsideFrame*2
     ) - globalConfig.trashToolBarHeight*2;

     const bestFrameWidth = (windowInnerWidth
         - globalConfig.responsiveSizeData.storyboardDrawerWidth
         - globalConfig.panelTabsWidth
         - globalConfig.responsiveSizeData.actorDrawerWidth
         - globalConfig.responsiveSizeData.noteWidth
         -  globalConfig.innerBoxLeftRightPaddingEach*2
     );

     return Math.min(bestFrameWidth, bestFrameHeight * 4 / 3);
}


Object.freeze(globalConfig);
Object.freeze(calcFrameWidth);

export default globalConfig;
export  {calcFrameWidth};

