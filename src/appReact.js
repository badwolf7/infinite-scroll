/**
 * The entire purpose to this file is to centralize and consolidate all React imports and shared PropType definitions.

 Info on styled-theming currently being used in SurveillanceOverviewCard:
  https://github.com/styled-components/styled-theming
  http://thejameskyle.com/styled-theming.html
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Router,
  Link,
  MemoryRouter,
  NavLink,
  Route,
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom';
import ReactDOM from 'react-dom';

import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';
import * as _ from 'lodash';

export {
  _,
  Component,
  Link,
  MemoryRouter,
  NavLink,
  PropTypes,
  React,
  ReactDOM,
  Redirect,
  Route,
  Router,
  styled,
  Switch,
  theme,
  ThemeProvider,
  withRouter,
};