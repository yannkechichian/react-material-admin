import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import RightDrawer from "../components/RightDrawer";
import Data from "../data";
import Dashboard from "./DashboardPage";
import ButtonBase from "@material-ui/core/ButtonBase";
import Form from "./FormPage";
import Table from "./TablePage";
import NotFound from "./NotFoundPage";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import defaultTheme, { customTheme } from "../theme";

const styles = () => ({
  container: {
    margin: "80px 20px 20px 15px",
    paddingLeft: defaultTheme.drawer.width,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
    // width: `calc(100% - ${defaultTheme.drawer.width}px)`
  },
  containerFull: {
    paddingLeft: defaultTheme.drawer.miniWidth,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
  },
  settingBtn: {
    top: 80,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "white",
    width: 48,
    right: 0,
    height: 48,
    opacity: 0.9,
    padding: 0,
    zIndex: 999,
    position: "absolute",
    minWidth: 48,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    // nav bar default open in desktop screen, and default closed in mobile screen
    this.state = {
      theme: defaultTheme,
      rightDrawerOpen: false,
      navDrawerOpen:
        window &&
        window.innerWidth &&
        window.innerWidth >= defaultTheme.breakpoints.values.md
          ? true
          : false
    };

    this.handleChangeRightDrawer = this.handleChangeRightDrawer.bind(this);
    this.handleChangeNavDrawer = this.handleChangeNavDrawer.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
  }

  handleChangeNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  handleChangeRightDrawer() {
    this.setState({
      rightDrawerOpen: !this.state.rightDrawerOpen
    });
  }

  handleChangeTheme(colorOption) {
    console.log("color option selected:", colorOption);
    const theme = customTheme({
      palette: colorOption
    });
    console.log("theme now:", colorOption);
    this.setState({
      theme
    });
  }

  render() {
    const { classes } = this.props;
    const { navDrawerOpen, rightDrawerOpen, theme } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Header
          handleChangeNavDrawer={this.handleChangeNavDrawer}
          navDrawerOpen={navDrawerOpen}
        />

        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          handleChangeNavDrawer={this.handleChangeNavDrawer}
          menus={Data.menus}
          username="User Admin"
        />
        <ButtonBase
          color="inherit"
          classes={{ root: classes.settingBtn }}
          onClick={this.handleChangeRightDrawer}
        >
          <i className="fa fa-cog fa-3x" />
        </ButtonBase>
        <RightDrawer
          rightDrawerOpen={rightDrawerOpen}
          handleChangeRightDrawer={this.handleChangeRightDrawer}
          handleChangeTheme={this.handleChangeTheme}
        />
        <div
          className={classNames(
            classes.container,
            !navDrawerOpen && classes.containerFull
          )}
        >
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/form" component={Form} />
            <Route path="/table" component={Table} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default withStyles(styles)(App);
