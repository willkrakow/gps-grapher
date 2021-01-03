import React, { useState } from "react";
import { Container, Row, Col, Form, Label, Input, FormGroup } from "reactstrap";
import Map from "./components/Map";
import GPX from "gpx-parser-builder";
import Elevation from "./components/Elevation"
import Pace from "./components/Pace";
import { compressArray } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import { TagTitle } from "./components/Typography";
import Paper from './components/Paper';
import Splits from './components/Splits'


// const data = `<?xml version="1.0" encoding="UTF-8"?>
// <gpx creator="StravaGPX iPhone" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
//  <metadata>
//   <time>2020-05-19T15:00:27Z</time>
//  </metadata>
//  <trk>
//   <name>Lunch Run</name>
//   <type>9</type>
//   <trkseg>
//    <trkpt lat="36.0724900" lon="-79.1109430">
//     <ele>164.4</ele>
//     <time>2020-05-19T15:00:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0724740" lon="-79.1109060">
//     <ele>164.4</ele>
//     <time>2020-05-19T15:00:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0724610" lon="-79.1108620">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:00:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0724520" lon="-79.1108160">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:00:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0724440" lon="-79.1107730">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:00:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0724360" lon="-79.1107310">
//     <ele>163.1</ele>
//     <time>2020-05-19T15:00:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0724260" lon="-79.1106870">
//     <ele>163.2</ele>
//     <time>2020-05-19T15:00:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0724170" lon="-79.1106460">
//     <ele>163.3</ele>
//     <time>2020-05-19T15:00:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0724100" lon="-79.1106030">
//     <ele>163.4</ele>
//     <time>2020-05-19T15:00:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0724070" lon="-79.1105630">
//     <ele>163.5</ele>
//     <time>2020-05-19T15:00:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0724060" lon="-79.1105260">
//     <ele>163.6</ele>
//     <time>2020-05-19T15:00:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0724080" lon="-79.1104770">
//     <ele>163.7</ele>
//     <time>2020-05-19T15:00:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0724080" lon="-79.1104590">
//     <ele>163.7</ele>
//     <time>2020-05-19T15:00:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0724090" lon="-79.1104240">
//     <ele>163.8</ele>
//     <time>2020-05-19T15:00:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0724140" lon="-79.1103590">
//     <ele>163.9</ele>
//     <time>2020-05-19T15:00:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0724200" lon="-79.1103170">
//     <ele>164.0</ele>
//     <time>2020-05-19T15:00:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0724210" lon="-79.1103030">
//     <ele>164.1</ele>
//     <time>2020-05-19T15:00:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0724290" lon="-79.1102630">
//     <ele>164.1</ele>
//     <time>2020-05-19T15:00:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0724310" lon="-79.1102500">
//     <ele>164.2</ele>
//     <time>2020-05-19T15:00:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0724350" lon="-79.1102090">
//     <ele>164.3</ele>
//     <time>2020-05-19T15:00:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0724340" lon="-79.1101950">
//     <ele>164.3</ele>
//     <time>2020-05-19T15:00:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0724340" lon="-79.1101520">
//     <ele>164.4</ele>
//     <time>2020-05-19T15:00:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0724340" lon="-79.1101380">
//     <ele>164.4</ele>
//     <time>2020-05-19T15:00:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0724370" lon="-79.1100880">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:00:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0724380" lon="-79.1100710">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:00:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0724380" lon="-79.1100260">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:00:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0724380" lon="-79.1100110">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:00:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0724420" lon="-79.1099650">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:00:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0724430" lon="-79.1099490">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:00:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0724430" lon="-79.1099110">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:00:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0724430" lon="-79.1098690">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:00:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0724400" lon="-79.1098300">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:00:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0724410" lon="-79.1097920">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:00:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0724410" lon="-79.1097570">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0724450" lon="-79.1097120">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0724460" lon="-79.1096960">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0724520" lon="-79.1096500">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0724550" lon="-79.1096310">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0724650" lon="-79.1095940">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0724800" lon="-79.1095540">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0724850" lon="-79.1095420">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0724960" lon="-79.1095030">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0724990" lon="-79.1094880">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:01:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0725000" lon="-79.1094540">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:01:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0725020" lon="-79.1094060">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:01:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0725030" lon="-79.1093880">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:01:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0725080" lon="-79.1093490">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:01:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0725120" lon="-79.1093130">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:01:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0725120" lon="-79.1092660">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:01:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0725110" lon="-79.1092520">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:01:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0725050" lon="-79.1092090">
//     <ele>164.4</ele>
//     <time>2020-05-19T15:01:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0725030" lon="-79.1091950">
//     <ele>164.4</ele>
//     <time>2020-05-19T15:01:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0725010" lon="-79.1091490">
//     <ele>164.4</ele>
//     <time>2020-05-19T15:01:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0725010" lon="-79.1091320">
//     <ele>164.4</ele>
//     <time>2020-05-19T15:01:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0725060" lon="-79.1090860">
//     <ele>164.3</ele>
//     <time>2020-05-19T15:01:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0725070" lon="-79.1090680">
//     <ele>164.3</ele>
//     <time>2020-05-19T15:01:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0725120" lon="-79.1090270">
//     <ele>164.3</ele>
//     <time>2020-05-19T15:01:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0725180" lon="-79.1089880">
//     <ele>164.2</ele>
//     <time>2020-05-19T15:01:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0725240" lon="-79.1089490">
//     <ele>164.2</ele>
//     <time>2020-05-19T15:01:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0725340" lon="-79.1089120">
//     <ele>164.1</ele>
//     <time>2020-05-19T15:01:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0725450" lon="-79.1088730">
//     <ele>164.0</ele>
//     <time>2020-05-19T15:01:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0725520" lon="-79.1088360">
//     <ele>163.8</ele>
//     <time>2020-05-19T15:01:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0725440" lon="-79.1088030">
//     <ele>163.6</ele>
//     <time>2020-05-19T15:01:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0725250" lon="-79.1087740">
//     <ele>163.3</ele>
//     <time>2020-05-19T15:01:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0724980" lon="-79.1087580">
//     <ele>163.0</ele>
//     <time>2020-05-19T15:01:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0724640" lon="-79.1087450">
//     <ele>162.7</ele>
//     <time>2020-05-19T15:01:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0724270" lon="-79.1087410">
//     <ele>162.3</ele>
//     <time>2020-05-19T15:01:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0723900" lon="-79.1087420">
//     <ele>162.0</ele>
//     <time>2020-05-19T15:01:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0723520" lon="-79.1087480">
//     <ele>161.6</ele>
//     <time>2020-05-19T15:01:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0723170" lon="-79.1087580">
//     <ele>161.3</ele>
//     <time>2020-05-19T15:01:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0722850" lon="-79.1087690">
//     <ele>161.0</ele>
//     <time>2020-05-19T15:01:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0722540" lon="-79.1087850">
//     <ele>160.6</ele>
//     <time>2020-05-19T15:01:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0722240" lon="-79.1088040">
//     <ele>160.3</ele>
//     <time>2020-05-19T15:01:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0721930" lon="-79.1088230">
//     <ele>160.0</ele>
//     <time>2020-05-19T15:01:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0721620" lon="-79.1088400">
//     <ele>159.7</ele>
//     <time>2020-05-19T15:01:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0721340" lon="-79.1088550">
//     <ele>159.4</ele>
//     <time>2020-05-19T15:01:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0721070" lon="-79.1088660">
//     <ele>159.1</ele>
//     <time>2020-05-19T15:01:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0720740" lon="-79.1088540">
//     <ele>158.8</ele>
//     <time>2020-05-19T15:01:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0720650" lon="-79.1088450">
//     <ele>158.7</ele>
//     <time>2020-05-19T15:01:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0720540" lon="-79.1088110">
//     <ele>158.4</ele>
//     <time>2020-05-19T15:01:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0720510" lon="-79.1087670">
//     <ele>158.0</ele>
//     <time>2020-05-19T15:01:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0720530" lon="-79.1087220">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:01:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0720570" lon="-79.1086840">
//     <ele>157.5</ele>
//     <time>2020-05-19T15:01:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0720670" lon="-79.1086360">
//     <ele>157.4</ele>
//     <time>2020-05-19T15:01:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0720700" lon="-79.1086190">
//     <ele>157.3</ele>
//     <time>2020-05-19T15:01:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0720800" lon="-79.1085740">
//     <ele>157.2</ele>
//     <time>2020-05-19T15:01:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0720840" lon="-79.1085590">
//     <ele>157.2</ele>
//     <time>2020-05-19T15:01:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0720960" lon="-79.1085240">
//     <ele>157.1</ele>
//     <time>2020-05-19T15:01:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0721060" lon="-79.1084890">
//     <ele>157.0</ele>
//     <time>2020-05-19T15:01:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0721130" lon="-79.1084530">
//     <ele>156.8</ele>
//     <time>2020-05-19T15:01:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0721170" lon="-79.1084090">
//     <ele>156.7</ele>
//     <time>2020-05-19T15:01:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0721170" lon="-79.1083670">
//     <ele>156.5</ele>
//     <time>2020-05-19T15:01:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0721150" lon="-79.1083250">
//     <ele>156.4</ele>
//     <time>2020-05-19T15:01:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0721120" lon="-79.1082830">
//     <ele>156.2</ele>
//     <time>2020-05-19T15:02:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0721090" lon="-79.1082440">
//     <ele>156.1</ele>
//     <time>2020-05-19T15:02:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0721100" lon="-79.1082060">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:02:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0721140" lon="-79.1081690">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:02:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0721210" lon="-79.1081360">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:02:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0721460" lon="-79.1081050">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:02:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0721560" lon="-79.1080970">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:02:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0721900" lon="-79.1080840">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:02:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0722300" lon="-79.1080750">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:02:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0722640" lon="-79.1080640">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:02:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0722940" lon="-79.1080520">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:02:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0723180" lon="-79.1080360">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:02:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0723400" lon="-79.1079960">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:02:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0723440" lon="-79.1079790">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:02:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0723450" lon="-79.1079420">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:02:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0723430" lon="-79.1079070">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:02:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0723440" lon="-79.1078700">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:02:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0723530" lon="-79.1078370">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:02:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0723900" lon="-79.1078140">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:02:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0724050" lon="-79.1078090">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:02:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0724400" lon="-79.1078110">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:02:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0724730" lon="-79.1078150">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:02:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0725090" lon="-79.1078120">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:02:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0725450" lon="-79.1078030">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:02:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0725750" lon="-79.1077940">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0726130" lon="-79.1077790">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0726260" lon="-79.1077730">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0726610" lon="-79.1077510">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0726700" lon="-79.1077410">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0726880" lon="-79.1077140">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0727040" lon="-79.1076830">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0727170" lon="-79.1076530">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0727310" lon="-79.1076090">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0727360" lon="-79.1075940">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0727540" lon="-79.1075490">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0727610" lon="-79.1075330">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0727820" lon="-79.1075050">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0728140" lon="-79.1074720">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0728530" lon="-79.1074400">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0728910" lon="-79.1074130">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0729310" lon="-79.1073890">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0729650" lon="-79.1073690">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0729950" lon="-79.1073560">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0730200" lon="-79.1073420">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0730470" lon="-79.1073250">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0730730" lon="-79.1073070">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0730960" lon="-79.1072870">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0731170" lon="-79.1072640">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0731320" lon="-79.1072360">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0731560" lon="-79.1071990">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0731650" lon="-79.1071860">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0731910" lon="-79.1071580">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0731970" lon="-79.1071490">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:02:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0732170" lon="-79.1071210">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0732230" lon="-79.1071090">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0732440" lon="-79.1070680">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0732510" lon="-79.1070530">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:02:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0732680" lon="-79.1070200">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:02:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0732840" lon="-79.1069830">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:02:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0733000" lon="-79.1069440">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:02:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0733150" lon="-79.1068950">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:03:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0733230" lon="-79.1068380">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:03:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0733250" lon="-79.1067810">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:03:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0733230" lon="-79.1067370">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:03:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0733220" lon="-79.1067040">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:03:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0733180" lon="-79.1066590">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:03:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0733150" lon="-79.1066450">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:03:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0733050" lon="-79.1066120">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:03:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0732980" lon="-79.1065720">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:03:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0732970" lon="-79.1065610">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:03:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0733020" lon="-79.1065210">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:03:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0733040" lon="-79.1065060">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:03:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0733050" lon="-79.1064590">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:03:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0733060" lon="-79.1064440">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:03:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0733050" lon="-79.1064070">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:03:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0733040" lon="-79.1063660">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:03:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0732990" lon="-79.1063220">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:03:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0732910" lon="-79.1062790">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:03:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0732800" lon="-79.1062380">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:03:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0732700" lon="-79.1062010">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:03:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0732620" lon="-79.1061560">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:03:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0732550" lon="-79.1061090">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:03:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0732480" lon="-79.1060650">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:03:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0732400" lon="-79.1060250">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:03:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0732280" lon="-79.1059840">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:03:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0732160" lon="-79.1059410">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:03:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0732030" lon="-79.1059070">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:03:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0732010" lon="-79.1059030">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:03:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0731980" lon="-79.1058980">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:03:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0731920" lon="-79.1058830">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:03:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0731840" lon="-79.1058630">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:03:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0731760" lon="-79.1058170">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:03:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0731730" lon="-79.1057990">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:03:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0731700" lon="-79.1057620">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:03:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0731700" lon="-79.1057250">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:03:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0731710" lon="-79.1056870">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:03:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0731730" lon="-79.1056500">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:03:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0731740" lon="-79.1056140">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:03:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0731770" lon="-79.1055780">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:03:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0731830" lon="-79.1055390">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:03:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0731930" lon="-79.1055020">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:03:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0732020" lon="-79.1054630">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:03:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0732080" lon="-79.1054240">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:03:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0732130" lon="-79.1053910">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:03:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0732140" lon="-79.1053550">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:03:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0732150" lon="-79.1053210">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:03:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0732170" lon="-79.1052850">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:03:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0732170" lon="-79.1052480">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:03:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0732140" lon="-79.1052110">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:03:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0732040" lon="-79.1051730">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:03:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0731920" lon="-79.1051370">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:03:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0731820" lon="-79.1051020">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:03:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0731780" lon="-79.1050630">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:03:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0731800" lon="-79.1050270">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:03:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0731880" lon="-79.1049870">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:03:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0731990" lon="-79.1049510">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:03:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0732110" lon="-79.1049160">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:03:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0732220" lon="-79.1048790">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:03:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0732360" lon="-79.1048430">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:03:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0732440" lon="-79.1048030">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:03:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0732500" lon="-79.1047620">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0732500" lon="-79.1047220">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0732510" lon="-79.1046880">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0732510" lon="-79.1046520">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:04:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0732550" lon="-79.1046080">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:04:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0732590" lon="-79.1045650">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0732660" lon="-79.1045240">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0732750" lon="-79.1044810">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0732810" lon="-79.1044400">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0732810" lon="-79.1044030">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0732720" lon="-79.1043670">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0732550" lon="-79.1043330">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0732360" lon="-79.1043020">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0732160" lon="-79.1042730">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0731920" lon="-79.1042450">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0731680" lon="-79.1042150">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0731420" lon="-79.1041830">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0731170" lon="-79.1041500">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0730950" lon="-79.1041190">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0730650" lon="-79.1041030">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0730550" lon="-79.1041000">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0730220" lon="-79.1040980">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:04:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0730120" lon="-79.1040970">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:04:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0729800" lon="-79.1040830">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:04:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0729690" lon="-79.1040780">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:04:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0729340" lon="-79.1040530">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:04:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0729210" lon="-79.1040400">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:04:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0728950" lon="-79.1040090">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:04:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0728670" lon="-79.1039740">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:04:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0728390" lon="-79.1039350">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:04:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0728110" lon="-79.1038950">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:04:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0727860" lon="-79.1038590">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:04:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0727620" lon="-79.1038270">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:04:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0727410" lon="-79.1038050">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:04:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0727090" lon="-79.1037730">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:04:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0726960" lon="-79.1037600">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:04:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0726690" lon="-79.1037280">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:04:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0726460" lon="-79.1036930">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:04:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0726260" lon="-79.1036550">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:04:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0726060" lon="-79.1036130">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:04:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0725890" lon="-79.1035740">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:04:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0725750" lon="-79.1035380">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:04:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0725590" lon="-79.1034970">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:04:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0725430" lon="-79.1034570">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:04:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0725300" lon="-79.1034230">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:04:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0725170" lon="-79.1033890">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:04:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0725080" lon="-79.1033570">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:04:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0724980" lon="-79.1033250">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:04:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0724800" lon="-79.1032880">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:04:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0724620" lon="-79.1032510">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:04:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0724420" lon="-79.1032150">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:04:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0724260" lon="-79.1031800">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:04:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0724110" lon="-79.1031440">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:04:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0723900" lon="-79.1031040">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:04:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0723710" lon="-79.1030670">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:04:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0723540" lon="-79.1030320">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:04:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0723420" lon="-79.1029920">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:04:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0723330" lon="-79.1029510">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:04:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0723260" lon="-79.1029140">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:04:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0723210" lon="-79.1028630">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:04:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0723190" lon="-79.1028460">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:05:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0723170" lon="-79.1028120">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:05:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0723180" lon="-79.1027750">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:05:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0723210" lon="-79.1027350">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:05:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0723230" lon="-79.1027010">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:05:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0723190" lon="-79.1026500">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:05:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0723160" lon="-79.1026320">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:05:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0723060" lon="-79.1025820">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:05:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0723020" lon="-79.1025640">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:05:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0722960" lon="-79.1025290">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:05:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0722940" lon="-79.1024860">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:05:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0722930" lon="-79.1024720">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:05:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0722970" lon="-79.1024370">
//     <ele>156.0</ele>
//     <time>2020-05-19T15:05:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0722990" lon="-79.1024250">
//     <ele>156.0</ele>
//     <time>2020-05-19T15:05:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0723120" lon="-79.1023880">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:05:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0723180" lon="-79.1023740">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:05:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0723350" lon="-79.1023300">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:05:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0723420" lon="-79.1023150">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:05:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0723620" lon="-79.1022840">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:05:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0723800" lon="-79.1022510">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:05:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0723970" lon="-79.1022180">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:05:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0724120" lon="-79.1021830">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:05:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0724270" lon="-79.1021430">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:05:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0724390" lon="-79.1021010">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:05:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0724480" lon="-79.1020610">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:05:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0724560" lon="-79.1020180">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:05:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0724600" lon="-79.1019740">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:05:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0724640" lon="-79.1019300">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:05:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0724690" lon="-79.1018910">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:05:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0724820" lon="-79.1018540">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:05:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0725000" lon="-79.1018140">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:05:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0725220" lon="-79.1017810">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:05:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0725480" lon="-79.1017590">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:05:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0725790" lon="-79.1017460">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:05:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0726160" lon="-79.1017400">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:05:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0726470" lon="-79.1017410">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:05:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0726740" lon="-79.1017400">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:05:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0726940" lon="-79.1017330">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:05:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0727050" lon="-79.1017180">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:05:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0727100" lon="-79.1017000">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:05:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0727080" lon="-79.1016870">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:05:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0727030" lon="-79.1016740">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:05:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0726920" lon="-79.1016450">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:05:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0726890" lon="-79.1016320">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:05:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0726850" lon="-79.1015890">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:05:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0726770" lon="-79.1015430">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:05:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0726690" lon="-79.1015060">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:05:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0726610" lon="-79.1014680">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:05:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0726510" lon="-79.1014240">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:05:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0726420" lon="-79.1013880">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:05:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0726330" lon="-79.1013400">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:05:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0726300" lon="-79.1013240">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:05:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0726280" lon="-79.1012720">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:05:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0726280" lon="-79.1012520">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:05:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0726340" lon="-79.1012150">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:05:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0726490" lon="-79.1011840">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:05:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0726800" lon="-79.1011540">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:05:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0726930" lon="-79.1011470">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:05:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0727260" lon="-79.1011360">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:05:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0727580" lon="-79.1011270">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:05:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0727920" lon="-79.1011210">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:06:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0728270" lon="-79.1011150">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:06:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0728560" lon="-79.1011090">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:06:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0728830" lon="-79.1011010">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:06:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0729110" lon="-79.1010930">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:06:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0729380" lon="-79.1010880">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:06:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0729660" lon="-79.1010850">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:06:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0729950" lon="-79.1010820">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:06:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0730330" lon="-79.1010830">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:06:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0730450" lon="-79.1010850">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:06:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0730710" lon="-79.1010970">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:06:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0730970" lon="-79.1011110">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:06:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0731260" lon="-79.1011210">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:06:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0731540" lon="-79.1011090">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:06:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0731610" lon="-79.1011000">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:06:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0731650" lon="-79.1010610">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:06:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0731580" lon="-79.1010200">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:06:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0731470" lon="-79.1009800">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:06:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0731350" lon="-79.1009430">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:06:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0731090" lon="-79.1009020">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:06:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0730970" lon="-79.1008880">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:06:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0730630" lon="-79.1008590">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:06:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0730340" lon="-79.1008320">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:06:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0730090" lon="-79.1007990">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:06:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0729850" lon="-79.1007600">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:06:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0729650" lon="-79.1007250">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:06:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0729460" lon="-79.1006960">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:06:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0729250" lon="-79.1006680">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:06:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0729020" lon="-79.1006430">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:06:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0728800" lon="-79.1006200">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:06:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0728610" lon="-79.1005920">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:06:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0728430" lon="-79.1005600">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:06:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0728310" lon="-79.1005250">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:06:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0728190" lon="-79.1004920">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:06:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0728030" lon="-79.1004440">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:06:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0727970" lon="-79.1004270">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:06:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0727850" lon="-79.1003880">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:06:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0727720" lon="-79.1003450">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0727600" lon="-79.1003040">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0727420" lon="-79.1002680">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0727250" lon="-79.1002360">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0727050" lon="-79.1002010">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0726980" lon="-79.1001910">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0726890" lon="-79.1001400">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0726860" lon="-79.1001150">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0726840" lon="-79.1000540">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0726820" lon="-79.1000060">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0726800" lon="-79.0999710">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0726780" lon="-79.0999320">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0726750" lon="-79.0998850">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:06:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0726720" lon="-79.0998400">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0726660" lon="-79.0997960">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0726640" lon="-79.0997560">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0726520" lon="-79.0997210">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0726380" lon="-79.0996910">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0726250" lon="-79.0996570">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0726130" lon="-79.0996220">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0726050" lon="-79.0995990">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0725990" lon="-79.0995850">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0725840" lon="-79.0995570">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:06:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0725770" lon="-79.0995460">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:07:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0725590" lon="-79.0995190">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:07:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0725390" lon="-79.0994880">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:07:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0725160" lon="-79.0994630">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:07:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0724940" lon="-79.0994400">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:07:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0724720" lon="-79.0994120">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:07:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0724540" lon="-79.0993850">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:07:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0724370" lon="-79.0993530">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:07:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0724200" lon="-79.0993130">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:07:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0724040" lon="-79.0992720">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:07:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0723900" lon="-79.0992260">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:07:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0723790" lon="-79.0991740">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:07:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0723710" lon="-79.0991260">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:07:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0723630" lon="-79.0990810">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:07:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0723580" lon="-79.0990380">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:07:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0723560" lon="-79.0989960">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:07:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0723550" lon="-79.0989500">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:07:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0723580" lon="-79.0989060">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:07:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0723690" lon="-79.0988560">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0723830" lon="-79.0988120">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0724020" lon="-79.0987770">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0724230" lon="-79.0987450">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0724420" lon="-79.0987080">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0724580" lon="-79.0986770">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0724760" lon="-79.0986500">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0724970" lon="-79.0986250">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0725220" lon="-79.0986010">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0725500" lon="-79.0985720">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0725770" lon="-79.0985370">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0725990" lon="-79.0985040">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:07:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0726170" lon="-79.0984650">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0726340" lon="-79.0984320">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0726470" lon="-79.0984000">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0726600" lon="-79.0983650">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0726730" lon="-79.0983300">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0726840" lon="-79.0982930">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0726980" lon="-79.0982590">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0727160" lon="-79.0982240">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0727360" lon="-79.0981900">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0727610" lon="-79.0981620">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0727870" lon="-79.0981380">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0728130" lon="-79.0981120">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:07:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0728360" lon="-79.0980800">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:07:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0728520" lon="-79.0980420">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:07:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0728600" lon="-79.0980050">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:07:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0728670" lon="-79.0979670">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:07:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0728690" lon="-79.0979290">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:07:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0728640" lon="-79.0978920">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0728530" lon="-79.0978560">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0728380" lon="-79.0978210">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0728210" lon="-79.0977830">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0728030" lon="-79.0977460">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:07:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0727780" lon="-79.0977120">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0727700" lon="-79.0977040">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0727400" lon="-79.0976830">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0727290" lon="-79.0976790">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0726940" lon="-79.0976680">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0726800" lon="-79.0976640">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0726450" lon="-79.0976490">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0726100" lon="-79.0976380">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:07:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0725740" lon="-79.0976280">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0725370" lon="-79.0976190">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0725030" lon="-79.0976100">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0724680" lon="-79.0975950">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0724350" lon="-79.0975820">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0724040" lon="-79.0975690">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0723750" lon="-79.0975580">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0723470" lon="-79.0975500">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:08:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0723110" lon="-79.0975490">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:08:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0723000" lon="-79.0975500">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:08:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0722720" lon="-79.0975510">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:08:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0722400" lon="-79.0975500">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:08:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0722070" lon="-79.0975450">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:08:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0721750" lon="-79.0975370">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:08:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0721430" lon="-79.0975270">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:08:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0721100" lon="-79.0975130">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:08:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0720790" lon="-79.0974980">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:08:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0720500" lon="-79.0974820">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:08:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0720240" lon="-79.0974650">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:08:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0719980" lon="-79.0974460">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:08:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0719730" lon="-79.0974240">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:08:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0719500" lon="-79.0973970">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:08:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0719260" lon="-79.0973670">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:08:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0718970" lon="-79.0973540">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:08:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0718880" lon="-79.0973530">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:08:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0718720" lon="-79.0973510">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0718590" lon="-79.0973450">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0718480" lon="-79.0973300">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0718360" lon="-79.0973110">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0718240" lon="-79.0972710">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0718120" lon="-79.0972170">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:08:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0718020" lon="-79.0971650">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:08:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0717910" lon="-79.0971040">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0717750" lon="-79.0970390">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0717590" lon="-79.0969770">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0717460" lon="-79.0969210">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0717380" lon="-79.0968740">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:08:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0717310" lon="-79.0968230">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:08:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0717260" lon="-79.0967730">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:08:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0717190" lon="-79.0967150">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:08:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0717160" lon="-79.0966630">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:08:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0717130" lon="-79.0966180">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:08:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0717100" lon="-79.0965820">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:08:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0717040" lon="-79.0965410">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:08:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0717010" lon="-79.0965290">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:08:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0716910" lon="-79.0964760">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:08:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0716870" lon="-79.0964550">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:08:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0716820" lon="-79.0964130">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:08:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0716800" lon="-79.0963680">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:08:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0716830" lon="-79.0963230">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:08:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0716850" lon="-79.0962750">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:08:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0716840" lon="-79.0962230">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0716830" lon="-79.0961760">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:08:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0716830" lon="-79.0961320">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:08:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0716840" lon="-79.0960890">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:08:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0716840" lon="-79.0960450">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:08:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0716790" lon="-79.0960010">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:08:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0716690" lon="-79.0959580">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:08:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0716590" lon="-79.0959220">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:08:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0716480" lon="-79.0958910">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:08:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0716370" lon="-79.0958440">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:09:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0716330" lon="-79.0958290">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:09:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0716260" lon="-79.0957920">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:09:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0716180" lon="-79.0957460">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:09:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0716080" lon="-79.0956930">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:09:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0715960" lon="-79.0956460">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:09:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0715870" lon="-79.0956040">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:09:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0715800" lon="-79.0955680">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0715680" lon="-79.0955320">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0715580" lon="-79.0954980">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0715430" lon="-79.0954620">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0715360" lon="-79.0954530">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0715210" lon="-79.0954220">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0715160" lon="-79.0954120">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0715130" lon="-79.0953900">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0715110" lon="-79.0953720">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0715120" lon="-79.0953550">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0715120" lon="-79.0953320">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0715140" lon="-79.0952960">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0715140" lon="-79.0952830">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0715110" lon="-79.0952490">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0715070" lon="-79.0951990">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0715010" lon="-79.0951440">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0715010" lon="-79.0951000">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0715020" lon="-79.0950600">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0715040" lon="-79.0950130">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0715030" lon="-79.0949630">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0715040" lon="-79.0949120">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0715040" lon="-79.0948680">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0715040" lon="-79.0948330">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0715010" lon="-79.0947990">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0714940" lon="-79.0947600">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0714860" lon="-79.0947220">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0714790" lon="-79.0946710">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0714770" lon="-79.0946510">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0714790" lon="-79.0946040">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0714830" lon="-79.0945590">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0714840" lon="-79.0945150">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0714780" lon="-79.0944710">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0714750" lon="-79.0944590">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0714670" lon="-79.0944400">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0714620" lon="-79.0944250">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0714630" lon="-79.0943910">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0714630" lon="-79.0943760">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0714660" lon="-79.0943320">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0714670" lon="-79.0943160">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0714690" lon="-79.0942810">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0714750" lon="-79.0942440">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0714780" lon="-79.0942000">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0714750" lon="-79.0941560">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0714700" lon="-79.0941160">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0714630" lon="-79.0940800">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0714580" lon="-79.0940310">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:09:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0714580" lon="-79.0940140">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0714630" lon="-79.0939650">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0714640" lon="-79.0939480">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0714640" lon="-79.0938990">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0714620" lon="-79.0938820">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0714580" lon="-79.0938430">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0714530" lon="-79.0938020">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:09:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0714520" lon="-79.0937630">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0714510" lon="-79.0937110">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0714520" lon="-79.0936550">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0714490" lon="-79.0936090">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0714450" lon="-79.0935620">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0714420" lon="-79.0935180">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0714370" lon="-79.0934720">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0714290" lon="-79.0934270">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0714150" lon="-79.0933810">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0713990" lon="-79.0933350">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:10:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0713850" lon="-79.0932940">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0713690" lon="-79.0932550">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0713500" lon="-79.0932130">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0713310" lon="-79.0931770">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0713130" lon="-79.0931430">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0712980" lon="-79.0931100">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0712840" lon="-79.0930740">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0712690" lon="-79.0930370">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0712550" lon="-79.0930030">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0712410" lon="-79.0929690">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0712280" lon="-79.0929330">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0712190" lon="-79.0928960">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0712100" lon="-79.0928550">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0712050" lon="-79.0928160">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0712020" lon="-79.0927770">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0711970" lon="-79.0927400">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0711910" lon="-79.0927040">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0711850" lon="-79.0926680">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0711770" lon="-79.0926350">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0711660" lon="-79.0925990">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0711510" lon="-79.0925610">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0711310" lon="-79.0925230">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0711120" lon="-79.0924910">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0710920" lon="-79.0924520">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0710770" lon="-79.0924170">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0710630" lon="-79.0923830">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0710460" lon="-79.0923480">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0710250" lon="-79.0923180">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0710010" lon="-79.0922920">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0709790" lon="-79.0922660">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0709610" lon="-79.0922420">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0709360" lon="-79.0922040">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0709270" lon="-79.0921890">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0709130" lon="-79.0921490">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0709010" lon="-79.0921070">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0708980" lon="-79.0920950">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0708870" lon="-79.0920620">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0708690" lon="-79.0920160">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0708520" lon="-79.0919720">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0708350" lon="-79.0919330">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0708140" lon="-79.0918930">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0707930" lon="-79.0918510">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0707720" lon="-79.0918180">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0707510" lon="-79.0917920">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0707310" lon="-79.0917690">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0707130" lon="-79.0917430">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0706970" lon="-79.0917050">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0706840" lon="-79.0916520">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0706720" lon="-79.0915980">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:10:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0706620" lon="-79.0915450">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:10:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0706530" lon="-79.0914970">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:11:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0706460" lon="-79.0914570">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:11:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0706380" lon="-79.0914220">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:11:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0706320" lon="-79.0913830">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:11:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0706250" lon="-79.0913400">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0706230" lon="-79.0913280">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0706070" lon="-79.0912800">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0706000" lon="-79.0912650">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0705810" lon="-79.0912340">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0705580" lon="-79.0912060">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0705350" lon="-79.0911810">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0705090" lon="-79.0911560">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0704830" lon="-79.0911360">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0704610" lon="-79.0911120">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0704400" lon="-79.0910850">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0704210" lon="-79.0910430">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0704150" lon="-79.0910290">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0704030" lon="-79.0909980">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:11:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0703860" lon="-79.0909650">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0703690" lon="-79.0909320">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0703560" lon="-79.0908930">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0703510" lon="-79.0908520">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:11:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0703520" lon="-79.0908110">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:11:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0703600" lon="-79.0907750">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:11:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0703720" lon="-79.0907330">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:11:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0703750" lon="-79.0907190">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:11:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0703810" lon="-79.0906780">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0703800" lon="-79.0906660">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0703620" lon="-79.0906270">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0703530" lon="-79.0906130">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0703380" lon="-79.0905850">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0703300" lon="-79.0905500">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0703310" lon="-79.0905140">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0703370" lon="-79.0904750">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0703490" lon="-79.0904310">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0703670" lon="-79.0903860">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0703850" lon="-79.0903460">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0704030" lon="-79.0903070">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0704180" lon="-79.0902630">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:11:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0704340" lon="-79.0902240">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:11:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0704490" lon="-79.0901920">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:11:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0704670" lon="-79.0901650">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:11:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0704880" lon="-79.0901400">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:11:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0705120" lon="-79.0901170">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:11:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0705310" lon="-79.0900920">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:11:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0705480" lon="-79.0900570">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:11:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0705530" lon="-79.0900440">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0705620" lon="-79.0900080">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0705640" lon="-79.0899950">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0705720" lon="-79.0899480">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0705740" lon="-79.0899310">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0705770" lon="-79.0898950">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0705840" lon="-79.0898520">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0705860" lon="-79.0898370">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0705920" lon="-79.0897920">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0705950" lon="-79.0897770">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0706050" lon="-79.0897300">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0706080" lon="-79.0897120">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0706160" lon="-79.0896750">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0706240" lon="-79.0896420">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:11:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0706320" lon="-79.0896100">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:12:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0706420" lon="-79.0895770">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:12:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0706550" lon="-79.0895430">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:12:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0706710" lon="-79.0895070">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:12:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0706900" lon="-79.0894690">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0707070" lon="-79.0894310">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0707190" lon="-79.0893950">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0707250" lon="-79.0893600">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0707260" lon="-79.0893260">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0707300" lon="-79.0892890">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0707370" lon="-79.0892500">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0707470" lon="-79.0892160">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0707630" lon="-79.0891780">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0707730" lon="-79.0891410">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0707890" lon="-79.0891040">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0708030" lon="-79.0890660">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0708190" lon="-79.0890270">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0708350" lon="-79.0889880">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0708530" lon="-79.0889510">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0708710" lon="-79.0889240">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0708930" lon="-79.0888840">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0708990" lon="-79.0888690">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0709100" lon="-79.0888300">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0709140" lon="-79.0888150">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0709270" lon="-79.0887730">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0709310" lon="-79.0887580">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0709420" lon="-79.0887240">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0709580" lon="-79.0886880">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0709780" lon="-79.0886520">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0710020" lon="-79.0886160">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0710270" lon="-79.0885810">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0710510" lon="-79.0885440">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0710740" lon="-79.0885010">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0710960" lon="-79.0884660">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0711140" lon="-79.0884350">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0711280" lon="-79.0884030">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0711410" lon="-79.0883670">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0711570" lon="-79.0883260">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:12:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0711710" lon="-79.0882860">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:12:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0711830" lon="-79.0882490">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:12:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0711880" lon="-79.0882160">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:12:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0711870" lon="-79.0881800">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:12:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0711830" lon="-79.0881470">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:12:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0711760" lon="-79.0881090">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:12:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0711670" lon="-79.0880760">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:12:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0711400" lon="-79.0880410">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:12:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0711270" lon="-79.0880320">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:12:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0711010" lon="-79.0880200">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:12:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0710670" lon="-79.0880080">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:12:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0710310" lon="-79.0879930">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:12:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0709980" lon="-79.0879800">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:12:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0709690" lon="-79.0879570">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:12:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0709420" lon="-79.0879340">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:12:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0709160" lon="-79.0879120">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:12:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0708890" lon="-79.0878950">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:12:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0708490" lon="-79.0878820">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:12:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0708340" lon="-79.0878800">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0708050" lon="-79.0878760">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:12:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0707660" lon="-79.0878710">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:12:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0707510" lon="-79.0878710">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:12:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0707120" lon="-79.0878720">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:13:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0707000" lon="-79.0878730">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:13:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0706690" lon="-79.0878810">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:13:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0706590" lon="-79.0878830">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:13:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0706250" lon="-79.0878950">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:13:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0706120" lon="-79.0878990">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:13:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0705820" lon="-79.0879060">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:13:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0705470" lon="-79.0879130">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:13:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0705160" lon="-79.0879210">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:13:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0704840" lon="-79.0879300">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:13:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0704490" lon="-79.0879430">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:13:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0704140" lon="-79.0879530">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:13:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0703780" lon="-79.0879570">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:13:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0703420" lon="-79.0879540">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:13:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0703040" lon="-79.0879390">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:13:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0702680" lon="-79.0879220">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:13:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0702340" lon="-79.0879010">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:13:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0701990" lon="-79.0878790">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:13:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0701670" lon="-79.0878610">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:13:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0701350" lon="-79.0878420">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:13:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0701020" lon="-79.0878220">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:13:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0700680" lon="-79.0877940">
//     <ele>156.1</ele>
//     <time>2020-05-19T15:13:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0700360" lon="-79.0877690">
//     <ele>156.4</ele>
//     <time>2020-05-19T15:13:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0700040" lon="-79.0877440">
//     <ele>156.6</ele>
//     <time>2020-05-19T15:13:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0699740" lon="-79.0877240">
//     <ele>156.8</ele>
//     <time>2020-05-19T15:13:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0699500" lon="-79.0877100">
//     <ele>157.0</ele>
//     <time>2020-05-19T15:13:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0699200" lon="-79.0876920">
//     <ele>157.2</ele>
//     <time>2020-05-19T15:13:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0699090" lon="-79.0876870">
//     <ele>157.2</ele>
//     <time>2020-05-19T15:13:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0698830" lon="-79.0876760">
//     <ele>157.3</ele>
//     <time>2020-05-19T15:13:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0698560" lon="-79.0876660">
//     <ele>157.4</ele>
//     <time>2020-05-19T15:13:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0698250" lon="-79.0876550">
//     <ele>157.5</ele>
//     <time>2020-05-19T15:13:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0697940" lon="-79.0876420">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:13:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0697590" lon="-79.0876210">
//     <ele>157.7</ele>
//     <time>2020-05-19T15:13:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0697470" lon="-79.0876140">
//     <ele>157.7</ele>
//     <time>2020-05-19T15:13:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0697140" lon="-79.0875870">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:13:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0697020" lon="-79.0875800">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:13:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0696690" lon="-79.0875650">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:13:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0696560" lon="-79.0875600">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:13:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0696260" lon="-79.0875480">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:13:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0695940" lon="-79.0875410">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:13:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0695620" lon="-79.0875320">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:13:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0695350" lon="-79.0875230">
//     <ele>157.7</ele>
//     <time>2020-05-19T15:13:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0695050" lon="-79.0875030">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:13:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0694950" lon="-79.0874970">
//     <ele>157.5</ele>
//     <time>2020-05-19T15:13:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0694770" lon="-79.0874730">
//     <ele>157.5</ele>
//     <time>2020-05-19T15:13:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0694720" lon="-79.0874630">
//     <ele>157.4</ele>
//     <time>2020-05-19T15:13:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0694700" lon="-79.0874230">
//     <ele>157.3</ele>
//     <time>2020-05-19T15:13:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0694720" lon="-79.0874070">
//     <ele>157.3</ele>
//     <time>2020-05-19T15:13:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0694810" lon="-79.0873660">
//     <ele>157.1</ele>
//     <time>2020-05-19T15:13:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0694990" lon="-79.0873170">
//     <ele>157.0</ele>
//     <time>2020-05-19T15:13:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0695180" lon="-79.0872750">
//     <ele>156.9</ele>
//     <time>2020-05-19T15:13:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0695310" lon="-79.0872380">
//     <ele>156.8</ele>
//     <time>2020-05-19T15:13:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0695420" lon="-79.0872000">
//     <ele>156.7</ele>
//     <time>2020-05-19T15:13:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0695510" lon="-79.0871660">
//     <ele>156.6</ele>
//     <time>2020-05-19T15:13:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0695730" lon="-79.0871250">
//     <ele>156.5</ele>
//     <time>2020-05-19T15:13:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0695800" lon="-79.0871110">
//     <ele>156.5</ele>
//     <time>2020-05-19T15:13:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0695960" lon="-79.0870780">
//     <ele>156.4</ele>
//     <time>2020-05-19T15:13:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0696140" lon="-79.0870450">
//     <ele>156.4</ele>
//     <time>2020-05-19T15:13:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0696310" lon="-79.0870160">
//     <ele>156.3</ele>
//     <time>2020-05-19T15:13:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0696390" lon="-79.0869810">
//     <ele>156.3</ele>
//     <time>2020-05-19T15:13:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0696420" lon="-79.0869440">
//     <ele>156.2</ele>
//     <time>2020-05-19T15:14:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0696380" lon="-79.0869110">
//     <ele>156.1</ele>
//     <time>2020-05-19T15:14:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0696270" lon="-79.0868780">
//     <ele>156.1</ele>
//     <time>2020-05-19T15:14:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0696210" lon="-79.0868450">
//     <ele>156.0</ele>
//     <time>2020-05-19T15:14:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0696260" lon="-79.0868090">
//     <ele>156.0</ele>
//     <time>2020-05-19T15:14:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0696350" lon="-79.0867680">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:14:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0696480" lon="-79.0867260">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:14:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0696620" lon="-79.0866860">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:14:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0696730" lon="-79.0866490">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:14:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0696830" lon="-79.0866100">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:14:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0696940" lon="-79.0865710">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:14:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0697050" lon="-79.0865320">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:14:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0697150" lon="-79.0864920">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:14:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0697280" lon="-79.0864580">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:14:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0697410" lon="-79.0864230">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:14:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0697520" lon="-79.0863900">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:14:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0697590" lon="-79.0863520">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:14:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0697650" lon="-79.0863100">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:14:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0697700" lon="-79.0862720">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:14:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0697740" lon="-79.0862340">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:14:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0697750" lon="-79.0861940">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:14:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0697750" lon="-79.0861540">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:14:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0697780" lon="-79.0861110">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:14:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0697800" lon="-79.0860680">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:14:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0697820" lon="-79.0860260">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:14:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0697840" lon="-79.0859860">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:14:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0697880" lon="-79.0859500">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:14:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0697930" lon="-79.0859140">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:14:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0697950" lon="-79.0858630">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:14:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0697970" lon="-79.0857980">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:14:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0698000" lon="-79.0857300">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:14:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0698020" lon="-79.0856630">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:14:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0698060" lon="-79.0856220">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:14:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0698120" lon="-79.0855860">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:14:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0698130" lon="-79.0855710">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:14:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0698180" lon="-79.0855360">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:14:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0698180" lon="-79.0855240">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:14:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0698210" lon="-79.0854800">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:14:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0698220" lon="-79.0854650">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:14:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0698260" lon="-79.0854280">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:14:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0698290" lon="-79.0853950">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:14:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0698310" lon="-79.0853510">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:14:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0698310" lon="-79.0853360">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:14:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0698280" lon="-79.0852950">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:14:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0698270" lon="-79.0852810">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:14:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0698250" lon="-79.0852330">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:14:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0698250" lon="-79.0852170">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:14:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0698290" lon="-79.0851830">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:14:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0698350" lon="-79.0851400">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:14:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0698370" lon="-79.0851280">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:14:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0698420" lon="-79.0851050">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:14:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0698480" lon="-79.0850880">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:14:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0698510" lon="-79.0850630">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:14:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0698520" lon="-79.0850530">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:14:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0698530" lon="-79.0850420">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:14:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0698590" lon="-79.0849940">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:14:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0698630" lon="-79.0849700">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:14:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0698730" lon="-79.0849170">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:14:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0698840" lon="-79.0848730">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:14:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0698920" lon="-79.0848360">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:14:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0699010" lon="-79.0847970">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0699080" lon="-79.0847520">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:15:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0699150" lon="-79.0847220">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:15:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0699180" lon="-79.0847110">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:15:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0699220" lon="-79.0847000">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:15:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0699450" lon="-79.0846580">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:15:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0699530" lon="-79.0846410">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:15:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0699700" lon="-79.0846040">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:15:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0699860" lon="-79.0845710">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:15:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0700030" lon="-79.0845410">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:15:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0700240" lon="-79.0845120">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:15:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0700460" lon="-79.0844840">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:15:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0700700" lon="-79.0844530">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:15:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0700960" lon="-79.0844140">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:15:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0701230" lon="-79.0843700">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:15:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0701490" lon="-79.0843250">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:15:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0701740" lon="-79.0842810">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:15:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0702000" lon="-79.0842390">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:15:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0702310" lon="-79.0842030">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:15:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0702680" lon="-79.0841700">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:15:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0703050" lon="-79.0841480">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:15:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0703390" lon="-79.0841220">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:15:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0703680" lon="-79.0840920">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:15:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0703930" lon="-79.0840570">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:15:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0704170" lon="-79.0840240">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:15:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0704370" lon="-79.0839940">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:15:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0704580" lon="-79.0839620">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:15:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0704640" lon="-79.0839520">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:15:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0704810" lon="-79.0839130">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:15:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0704870" lon="-79.0838980">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:15:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0704980" lon="-79.0838630">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:15:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0705140" lon="-79.0838250">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0705190" lon="-79.0838140">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0705400" lon="-79.0837780">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0705480" lon="-79.0837640">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0705750" lon="-79.0837320">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0705830" lon="-79.0837210">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0706040" lon="-79.0836960">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0706340" lon="-79.0836700">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0706730" lon="-79.0836390">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0707020" lon="-79.0836110">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:15:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0707290" lon="-79.0835750">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:15:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0707360" lon="-79.0835600">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:15:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0707450" lon="-79.0835260">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:15:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0707560" lon="-79.0834730">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:15:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0707610" lon="-79.0834520">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:15:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0707720" lon="-79.0834050">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:15:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0707800" lon="-79.0833540">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:15:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0707880" lon="-79.0833010">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:15:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0707980" lon="-79.0832510">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:15:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0708130" lon="-79.0831970">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:15:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0708300" lon="-79.0831470">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:15:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0708440" lon="-79.0831020">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:15:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0708550" lon="-79.0830580">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:15:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0708660" lon="-79.0830140">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:15:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0708750" lon="-79.0829690">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:15:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0708870" lon="-79.0829290">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:15:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0708970" lon="-79.0828900">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:15:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0709070" lon="-79.0828550">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:15:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0709170" lon="-79.0828110">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:15:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0709290" lon="-79.0827690">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:16:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0709450" lon="-79.0827310">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:16:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0709640" lon="-79.0826940">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:16:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0709920" lon="-79.0826590">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:16:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0710210" lon="-79.0826270">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:16:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0710460" lon="-79.0825970">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:16:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0710650" lon="-79.0825630">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:16:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0710820" lon="-79.0825240">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:16:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0710840" lon="-79.0825120">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:16:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0710940" lon="-79.0824620">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:16:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0710970" lon="-79.0824440">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:16:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0711090" lon="-79.0824060">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:16:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0711270" lon="-79.0823680">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:16:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0711330" lon="-79.0823580">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:16:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0711500" lon="-79.0823290">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:16:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0711680" lon="-79.0822950">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:16:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0711840" lon="-79.0822620">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:16:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0711990" lon="-79.0822250">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:16:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0712140" lon="-79.0821830">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:16:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0712260" lon="-79.0821380">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:16:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0712340" lon="-79.0820920">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:16:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0712480" lon="-79.0820490">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:16:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0712630" lon="-79.0820130">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:16:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0712800" lon="-79.0819850">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:16:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0712970" lon="-79.0819540">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:16:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0713140" lon="-79.0819140">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:16:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0713210" lon="-79.0818810">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:16:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0713260" lon="-79.0818460">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:16:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0713300" lon="-79.0818070">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:16:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0713370" lon="-79.0817670">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:16:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0713490" lon="-79.0817320">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:16:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0713630" lon="-79.0817020">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:16:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0713790" lon="-79.0816700">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:16:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0714000" lon="-79.0816380">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:16:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0714210" lon="-79.0816070">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:16:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0714470" lon="-79.0815770">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:16:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0714750" lon="-79.0815460">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:16:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0715010" lon="-79.0815110">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:16:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0715260" lon="-79.0814740">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:16:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0715420" lon="-79.0814440">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:16:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0715620" lon="-79.0814130">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:16:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0715870" lon="-79.0813800">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:16:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0716090" lon="-79.0813480">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:16:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0716270" lon="-79.0813160">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:16:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0716480" lon="-79.0812860">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:16:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0716550" lon="-79.0812750">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:16:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0716780" lon="-79.0812500">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:16:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0716840" lon="-79.0812420">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:16:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0716970" lon="-79.0812280">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:16:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0717090" lon="-79.0812250">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:16:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0717370" lon="-79.0812230">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:16:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0717470" lon="-79.0812210">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:16:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0717810" lon="-79.0812080">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:16:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0717920" lon="-79.0812010">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:16:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0718320" lon="-79.0811860">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:16:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0718470" lon="-79.0811810">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:16:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0718870" lon="-79.0811680">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:16:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0719300" lon="-79.0811570">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:16:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0719680" lon="-79.0811440">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:16:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0720020" lon="-79.0811340">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:16:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0720340" lon="-79.0811240">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:17:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0720680" lon="-79.0811160">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:17:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0721020" lon="-79.0811110">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:17:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0721340" lon="-79.0811060">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:17:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0721660" lon="-79.0811020">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:17:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0721950" lon="-79.0810830">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:17:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0722090" lon="-79.0810500">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:17:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0722090" lon="-79.0810100">
//     <ele>150.8</ele>
//     <time>2020-05-19T15:17:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0721990" lon="-79.0809680">
//     <ele>150.8</ele>
//     <time>2020-05-19T15:17:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0721800" lon="-79.0809300">
//     <ele>150.7</ele>
//     <time>2020-05-19T15:17:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0721570" lon="-79.0808980">
//     <ele>150.7</ele>
//     <time>2020-05-19T15:17:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0721350" lon="-79.0808760">
//     <ele>150.6</ele>
//     <time>2020-05-19T15:17:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0721120" lon="-79.0808560">
//     <ele>150.6</ele>
//     <time>2020-05-19T15:17:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0720880" lon="-79.0808290">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:17:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0720640" lon="-79.0807980">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:17:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0720440" lon="-79.0807690">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:17:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0720250" lon="-79.0807380">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:17:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0720090" lon="-79.0806980">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0720040" lon="-79.0806550">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0720060" lon="-79.0806060">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0720080" lon="-79.0805610">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0720080" lon="-79.0805180">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0720050" lon="-79.0804750">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0720020" lon="-79.0804330">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0720020" lon="-79.0803900">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0720020" lon="-79.0803520">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0720040" lon="-79.0803140">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0720090" lon="-79.0802760">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0720170" lon="-79.0802370">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0720270" lon="-79.0801980">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0720370" lon="-79.0801620">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0720570" lon="-79.0801260">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0720810" lon="-79.0800900">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0721060" lon="-79.0800600">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0721290" lon="-79.0800310">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0721530" lon="-79.0799980">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0721770" lon="-79.0799660">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0722010" lon="-79.0799380">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0722270" lon="-79.0799130">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0722520" lon="-79.0798970">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0722790" lon="-79.0798840">
//     <ele>150.2</ele>
//     <time>2020-05-19T15:17:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0723120" lon="-79.0798810">
//     <ele>150.2</ele>
//     <time>2020-05-19T15:17:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0723220" lon="-79.0798800">
//     <ele>150.2</ele>
//     <time>2020-05-19T15:17:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0723520" lon="-79.0798730">
//     <ele>150.2</ele>
//     <time>2020-05-19T15:17:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0723620" lon="-79.0798690">
//     <ele>150.2</ele>
//     <time>2020-05-19T15:17:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0723980" lon="-79.0798590">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0724110" lon="-79.0798560">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0724550" lon="-79.0798600">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0724720" lon="-79.0798590">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0725090" lon="-79.0798580">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0725500" lon="-79.0798560">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0725910" lon="-79.0798500">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0726260" lon="-79.0798460">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0726580" lon="-79.0798350">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0726910" lon="-79.0798300">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0727250" lon="-79.0798300">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0727590" lon="-79.0798310">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0727950" lon="-79.0798310">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0728290" lon="-79.0798300">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0728670" lon="-79.0798310">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:17:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0728810" lon="-79.0798330">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0729130" lon="-79.0798320">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0729450" lon="-79.0798360">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0729790" lon="-79.0798440">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0730050" lon="-79.0798600">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0730390" lon="-79.0798720">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0730730" lon="-79.0798810">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0731060" lon="-79.0798880">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0731410" lon="-79.0799030">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0731500" lon="-79.0799100">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0731790" lon="-79.0799290">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0732130" lon="-79.0799440">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0732470" lon="-79.0799530">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0732800" lon="-79.0799590">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0733170" lon="-79.0799650">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0733570" lon="-79.0799710">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0733870" lon="-79.0799720">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0734260" lon="-79.0799690">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0734390" lon="-79.0799680">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0734740" lon="-79.0799700">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0735120" lon="-79.0799720">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0735410" lon="-79.0799790">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0735800" lon="-79.0799970">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0735950" lon="-79.0800030">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0736270" lon="-79.0800150">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0736600" lon="-79.0800240">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0736970" lon="-79.0800330">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0737320" lon="-79.0800450">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0737670" lon="-79.0800600">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0738010" lon="-79.0800710">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0738320" lon="-79.0800750">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0738650" lon="-79.0800730">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0738920" lon="-79.0800700">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0739240" lon="-79.0800720">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0739630" lon="-79.0800810">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0740110" lon="-79.0800960">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0740590" lon="-79.0801070">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0740930" lon="-79.0801110">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0741010" lon="-79.0801100">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0741320" lon="-79.0801060">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0741450" lon="-79.0801050">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:18:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0741770" lon="-79.0801090">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0742130" lon="-79.0801130">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0742490" lon="-79.0801220">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0742870" lon="-79.0801310">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0743150" lon="-79.0801390">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0743420" lon="-79.0801470">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0743770" lon="-79.0801530">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0744140" lon="-79.0801570">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0744490" lon="-79.0801550">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0744870" lon="-79.0801490">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0745000" lon="-79.0801480">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0745360" lon="-79.0801540">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0745460" lon="-79.0801580">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0745770" lon="-79.0801710">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0745880" lon="-79.0801750">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0746180" lon="-79.0801830">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0746280" lon="-79.0801860">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0746610" lon="-79.0801920">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0746730" lon="-79.0801940">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:18:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0747040" lon="-79.0802040">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0747130" lon="-79.0802090">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0747490" lon="-79.0802240">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0747620" lon="-79.0802300">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0747890" lon="-79.0802410">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0748190" lon="-79.0802540">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0748500" lon="-79.0802690">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0748790" lon="-79.0802790">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0749120" lon="-79.0802820">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0749500" lon="-79.0802760">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0749840" lon="-79.0802750">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0750170" lon="-79.0802820">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0750520" lon="-79.0802940">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0750910" lon="-79.0803080">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0751390" lon="-79.0803200">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0751910" lon="-79.0803300">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0752460" lon="-79.0803440">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0752940" lon="-79.0803570">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0753330" lon="-79.0803680">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0753730" lon="-79.0803780">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0754130" lon="-79.0803870">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0754530" lon="-79.0803930">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0754900" lon="-79.0803950">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0755230" lon="-79.0803980">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0755550" lon="-79.0804040">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0755870" lon="-79.0804120">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0756240" lon="-79.0804210">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0756660" lon="-79.0804310">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0756980" lon="-79.0804390">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0757290" lon="-79.0804460">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0757630" lon="-79.0804530">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0757950" lon="-79.0804580">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0758320" lon="-79.0804650">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0758730" lon="-79.0804710">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0759140" lon="-79.0804760">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0759530" lon="-79.0804890">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0759870" lon="-79.0805050">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0760200" lon="-79.0805220">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0760540" lon="-79.0805440">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0760640" lon="-79.0805500">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0761000" lon="-79.0805670">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0761100" lon="-79.0805730">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0761410" lon="-79.0805890">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0761520" lon="-79.0805950">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0761890" lon="-79.0806220">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0762030" lon="-79.0806330">
//     <ele>150.3</ele>
//     <time>2020-05-19T15:19:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0762340" lon="-79.0806570">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0762780" lon="-79.0806850">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0763230" lon="-79.0807130">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0763620" lon="-79.0807320">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0763980" lon="-79.0807470">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0764370" lon="-79.0807640">
//     <ele>150.4</ele>
//     <time>2020-05-19T15:19:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0764700" lon="-79.0807860">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0764930" lon="-79.0808090">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0765160" lon="-79.0808370">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0765400" lon="-79.0808720">
//     <ele>150.5</ele>
//     <time>2020-05-19T15:19:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0765580" lon="-79.0809100">
//     <ele>150.6</ele>
//     <time>2020-05-19T15:19:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0765680" lon="-79.0809420">
//     <ele>150.6</ele>
//     <time>2020-05-19T15:19:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0765710" lon="-79.0809800">
//     <ele>150.6</ele>
//     <time>2020-05-19T15:19:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0765760" lon="-79.0810240">
//     <ele>150.6</ele>
//     <time>2020-05-19T15:19:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0765770" lon="-79.0810380">
//     <ele>150.6</ele>
//     <time>2020-05-19T15:20:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0765910" lon="-79.0810700">
//     <ele>150.6</ele>
//     <time>2020-05-19T15:20:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0765970" lon="-79.0810790">
//     <ele>150.7</ele>
//     <time>2020-05-19T15:20:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0766060" lon="-79.0810930">
//     <ele>150.7</ele>
//     <time>2020-05-19T15:20:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0766100" lon="-79.0811210">
//     <ele>150.7</ele>
//     <time>2020-05-19T15:20:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0766080" lon="-79.0811590">
//     <ele>150.7</ele>
//     <time>2020-05-19T15:20:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0766040" lon="-79.0812000">
//     <ele>150.8</ele>
//     <time>2020-05-19T15:20:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0765960" lon="-79.0812480">
//     <ele>150.8</ele>
//     <time>2020-05-19T15:20:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0765820" lon="-79.0813080">
//     <ele>150.8</ele>
//     <time>2020-05-19T15:20:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0765680" lon="-79.0813740">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:20:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0765510" lon="-79.0814460">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:20:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0765380" lon="-79.0814910">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:20:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0765250" lon="-79.0815260">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:20:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0765140" lon="-79.0815640">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:20:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0765010" lon="-79.0816120">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:20:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0764880" lon="-79.0816550">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:20:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0764720" lon="-79.0816910">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:20:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0764530" lon="-79.0817210">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:20:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0764230" lon="-79.0817450">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:20:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0764130" lon="-79.0817500">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:20:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0763800" lon="-79.0817600">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:20:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0763670" lon="-79.0817640">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:20:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0763360" lon="-79.0817780">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:20:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0763050" lon="-79.0818000">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:20:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0762710" lon="-79.0818230">
//     <ele>151.3</ele>
//     <time>2020-05-19T15:20:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0762290" lon="-79.0818550">
//     <ele>151.3</ele>
//     <time>2020-05-19T15:20:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0761810" lon="-79.0818710">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:20:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0761360" lon="-79.0818770">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:20:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0760920" lon="-79.0818820">
//     <ele>151.5</ele>
//     <time>2020-05-19T15:20:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0760570" lon="-79.0818850">
//     <ele>151.5</ele>
//     <time>2020-05-19T15:20:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0760290" lon="-79.0818880">
//     <ele>151.5</ele>
//     <time>2020-05-19T15:20:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0760010" lon="-79.0819030">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:20:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0759700" lon="-79.0819190">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:20:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0759350" lon="-79.0819360">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:20:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0759030" lon="-79.0819500">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:20:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0758710" lon="-79.0819530">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:20:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0758370" lon="-79.0819430">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:20:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0758080" lon="-79.0819350">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:20:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0757810" lon="-79.0819290">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:20:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0757540" lon="-79.0819240">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:20:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0757170" lon="-79.0819240">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:20:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0757040" lon="-79.0819240">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:20:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0756730" lon="-79.0819170">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:20:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0756430" lon="-79.0819050">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:20:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0756120" lon="-79.0818950">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:20:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0755860" lon="-79.0818830">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:20:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0755560" lon="-79.0818700">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:20:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0755290" lon="-79.0818520">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:20:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0755040" lon="-79.0818310">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:20:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0754730" lon="-79.0818110">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:20:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0754430" lon="-79.0818020">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:20:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0754080" lon="-79.0817970">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:20:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0753960" lon="-79.0817950">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:20:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0753620" lon="-79.0818020">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:20:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0753500" lon="-79.0818050">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:20:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0753170" lon="-79.0818070">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:20:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0752830" lon="-79.0818010">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:20:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0752550" lon="-79.0817810">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:20:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0752320" lon="-79.0817540">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:20:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0752080" lon="-79.0817360">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0751750" lon="-79.0817240">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0751370" lon="-79.0817170">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0750990" lon="-79.0817110">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0750700" lon="-79.0817000">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0750420" lon="-79.0816900">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0750080" lon="-79.0816760">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0749700" lon="-79.0816600">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0749340" lon="-79.0816550">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:21:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0748980" lon="-79.0816510">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:21:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0748610" lon="-79.0816460">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:21:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0748170" lon="-79.0816450">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:21:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0747660" lon="-79.0816420">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:21:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0747210" lon="-79.0816390">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:21:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0746790" lon="-79.0816350">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:21:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0746380" lon="-79.0816300">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:21:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0745970" lon="-79.0816310">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:21:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0745560" lon="-79.0816380">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:21:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0745180" lon="-79.0816540">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:21:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0744750" lon="-79.0816520">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:21:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0744320" lon="-79.0816380">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:21:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0743970" lon="-79.0816160">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:21:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0743640" lon="-79.0815970">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:21:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0743330" lon="-79.0815890">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:21:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0742980" lon="-79.0815860">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:21:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0742580" lon="-79.0815810">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:21:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0742200" lon="-79.0815770">
//     <ele>151.5</ele>
//     <time>2020-05-19T15:21:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0741830" lon="-79.0815690">
//     <ele>151.5</ele>
//     <time>2020-05-19T15:21:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0741510" lon="-79.0815570">
//     <ele>151.5</ele>
//     <time>2020-05-19T15:21:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0741230" lon="-79.0815470">
//     <ele>151.5</ele>
//     <time>2020-05-19T15:21:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0740920" lon="-79.0815300">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0740830" lon="-79.0815250">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0740690" lon="-79.0815170">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0740630" lon="-79.0815080">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0740650" lon="-79.0814940">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0740720" lon="-79.0814830">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0740800" lon="-79.0814760">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0740910" lon="-79.0814710">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0740890" lon="-79.0814720">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0740860" lon="-79.0814740">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0740840" lon="-79.0814750">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0740810" lon="-79.0814770">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0740790" lon="-79.0814780">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0740770" lon="-79.0814800">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0740740" lon="-79.0814810">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0740720" lon="-79.0814830">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0740690" lon="-79.0814840">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0740670" lon="-79.0814860">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:21:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0740650" lon="-79.0814870">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:22:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0740620" lon="-79.0814890">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:22:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0740600" lon="-79.0814900">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:22:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0740570" lon="-79.0814920">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:22:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0740550" lon="-79.0814930">
//     <ele>151.4</ele>
//     <time>2020-05-19T15:22:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0740200" lon="-79.0815140">
//     <ele>151.3</ele>
//     <time>2020-05-19T15:22:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0739750" lon="-79.0815410">
//     <ele>151.3</ele>
//     <time>2020-05-19T15:22:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0739310" lon="-79.0815630">
//     <ele>151.3</ele>
//     <time>2020-05-19T15:22:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0738950" lon="-79.0815770">
//     <ele>151.3</ele>
//     <time>2020-05-19T15:22:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0738620" lon="-79.0815780">
//     <ele>151.3</ele>
//     <time>2020-05-19T15:22:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0738230" lon="-79.0815730">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0737780" lon="-79.0815660">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0737300" lon="-79.0815590">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0736870" lon="-79.0815540">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0736490" lon="-79.0815510">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0736120" lon="-79.0815430">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0735820" lon="-79.0815360">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0735610" lon="-79.0815230">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0735380" lon="-79.0815060">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0735100" lon="-79.0814890">
//     <ele>151.2</ele>
//     <time>2020-05-19T15:22:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0734800" lon="-79.0814780">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0734490" lon="-79.0814750">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0734150" lon="-79.0814710">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0733790" lon="-79.0814660">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0733430" lon="-79.0814570">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0733060" lon="-79.0814470">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0732730" lon="-79.0814340">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0732380" lon="-79.0814220">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0732000" lon="-79.0814130">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0731630" lon="-79.0814070">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0731300" lon="-79.0814040">
//     <ele>151.1</ele>
//     <time>2020-05-19T15:22:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0731000" lon="-79.0814010">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:22:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0730690" lon="-79.0813950">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:22:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0730360" lon="-79.0813770">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:23:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0730080" lon="-79.0813470">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:23:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0729840" lon="-79.0813160">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:23:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0729620" lon="-79.0812870">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:23:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0729340" lon="-79.0812600">
//     <ele>151.0</ele>
//     <time>2020-05-19T15:23:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0729010" lon="-79.0812350">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0728660" lon="-79.0812180">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0728310" lon="-79.0811970">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0727930" lon="-79.0811760">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0727540" lon="-79.0811630">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0727180" lon="-79.0811520">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0726870" lon="-79.0811470">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0726550" lon="-79.0811430">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0726180" lon="-79.0811380">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0725740" lon="-79.0811330">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0725310" lon="-79.0811250">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0724880" lon="-79.0811180">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0724470" lon="-79.0811080">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0724070" lon="-79.0810970">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0723710" lon="-79.0810790">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0723360" lon="-79.0810590">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0722900" lon="-79.0810480">
//     <ele>150.9</ele>
//     <time>2020-05-19T15:23:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0722410" lon="-79.0810430">
//     <ele>151.3</ele>
//     <time>2020-05-19T15:23:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0721950" lon="-79.0810410">
//     <ele>151.6</ele>
//     <time>2020-05-19T15:23:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0721490" lon="-79.0810420">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:23:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0721100" lon="-79.0810520">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:23:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0720750" lon="-79.0810660">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:23:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0720380" lon="-79.0810830">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:23:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0720010" lon="-79.0811020">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:23:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0719630" lon="-79.0811280">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:23:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0719260" lon="-79.0811550">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:23:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0718920" lon="-79.0811830">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:23:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0718580" lon="-79.0812050">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:23:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0718250" lon="-79.0812210">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:23:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0717910" lon="-79.0812360">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:23:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0717640" lon="-79.0812480">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:23:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0717300" lon="-79.0812660">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:23:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0717180" lon="-79.0812730">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:23:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0716880" lon="-79.0812930">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:23:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0716540" lon="-79.0813110">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:23:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0716220" lon="-79.0813280">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:23:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0715930" lon="-79.0813380">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:23:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0715670" lon="-79.0813500">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:23:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0715340" lon="-79.0813760">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:23:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0715230" lon="-79.0813840">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:23:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0715000" lon="-79.0814050">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:23:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0714730" lon="-79.0814260">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0714660" lon="-79.0814300">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0714610" lon="-79.0814280">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0714640" lon="-79.0814360">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0714680" lon="-79.0814410">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0714710" lon="-79.0814420">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0714710" lon="-79.0814420">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0714700" lon="-79.0814430">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0714620" lon="-79.0814520">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0714520" lon="-79.0814610">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0714310" lon="-79.0814770">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0714230" lon="-79.0814830">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0714150" lon="-79.0814900">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:23:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0713890" lon="-79.0815190">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:23:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0713790" lon="-79.0815300">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:24:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0713560" lon="-79.0815590">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:24:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0713490" lon="-79.0815680">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:24:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0713350" lon="-79.0816000">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:24:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0713300" lon="-79.0816120">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:24:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0713180" lon="-79.0816520">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:24:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0713150" lon="-79.0816640">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:24:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0713080" lon="-79.0816890">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:24:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0713040" lon="-79.0817070">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:24:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0713010" lon="-79.0817260">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:24:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0712980" lon="-79.0817470">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:24:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0712900" lon="-79.0817880">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:24:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0712850" lon="-79.0818040">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:24:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0712740" lon="-79.0818370">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:24:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0712630" lon="-79.0818670">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:24:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0712510" lon="-79.0819020">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:24:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0712410" lon="-79.0819380">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:24:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0712320" lon="-79.0819730">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:24:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0712210" lon="-79.0820090">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:24:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0712130" lon="-79.0820470">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:24:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0712070" lon="-79.0820890">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:24:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0712060" lon="-79.0820980">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:24:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0711890" lon="-79.0821320">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:24:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0711800" lon="-79.0821450">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:24:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0711580" lon="-79.0821800">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:24:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0711360" lon="-79.0822120">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:24:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0711110" lon="-79.0822470">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:24:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0710870" lon="-79.0822900">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:24:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0710640" lon="-79.0823350">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:24:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0710430" lon="-79.0823720">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:24:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0710270" lon="-79.0824050">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:24:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0710070" lon="-79.0824350">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:24:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0709890" lon="-79.0824770">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:24:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0709700" lon="-79.0825340">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0709470" lon="-79.0826050">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0709280" lon="-79.0826710">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0709100" lon="-79.0827370">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0708910" lon="-79.0828010">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:24:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0708760" lon="-79.0828590">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:24:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0708630" lon="-79.0829150">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:24:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0708520" lon="-79.0829640">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:24:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0708420" lon="-79.0830060">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:24:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0708320" lon="-79.0830550">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0708240" lon="-79.0831130">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0708150" lon="-79.0831630">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0708020" lon="-79.0832090">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0707890" lon="-79.0832560">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0707740" lon="-79.0833020">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0707580" lon="-79.0833480">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:24:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0707390" lon="-79.0833880">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:24:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0707190" lon="-79.0834280">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:24:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0707000" lon="-79.0834690">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:24:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0706900" lon="-79.0835020">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:24:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0706800" lon="-79.0835450">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:24:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0706770" lon="-79.0835600">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:24:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0706710" lon="-79.0835970">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:24:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0706630" lon="-79.0836390">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:24:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0706560" lon="-79.0836810">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:24:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0706480" lon="-79.0837200">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:24:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0706380" lon="-79.0837540">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:24:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0706280" lon="-79.0837940">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:25:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0706200" lon="-79.0838410">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:25:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0706090" lon="-79.0838880">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:25:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0705940" lon="-79.0839340">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:25:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0705730" lon="-79.0839720">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:25:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0705470" lon="-79.0840100">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:25:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0705200" lon="-79.0840450">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:25:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0704990" lon="-79.0840840">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:25:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0704800" lon="-79.0841230">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:25:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0704650" lon="-79.0841570">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:25:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0704500" lon="-79.0841900">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:25:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0704360" lon="-79.0842280">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:25:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0704250" lon="-79.0842690">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:25:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0704170" lon="-79.0843030">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:25:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0704070" lon="-79.0843500">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:25:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0704010" lon="-79.0843680">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:25:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0703900" lon="-79.0844110">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:25:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0703850" lon="-79.0844500">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:25:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0703800" lon="-79.0844880">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:25:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0703710" lon="-79.0845290">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:25:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0703580" lon="-79.0845710">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:25:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0703450" lon="-79.0846130">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:25:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0703290" lon="-79.0846490">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:25:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0703150" lon="-79.0846880">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:25:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0702990" lon="-79.0847230">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:25:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0702800" lon="-79.0847650">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:25:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0702740" lon="-79.0847780">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:25:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0702570" lon="-79.0848130">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:25:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0702370" lon="-79.0848520">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:25:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0702190" lon="-79.0848880">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:25:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0701980" lon="-79.0849150">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:25:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0701920" lon="-79.0849220">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:25:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0701810" lon="-79.0849300">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:25:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0701670" lon="-79.0849400">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:25:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0701430" lon="-79.0849700">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:25:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0701360" lon="-79.0849790">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:25:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0701140" lon="-79.0850110">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:25:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0701060" lon="-79.0850230">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:25:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0700860" lon="-79.0850490">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:25:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0700650" lon="-79.0850780">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:25:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0700440" lon="-79.0851160">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:25:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0700220" lon="-79.0851590">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:25:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0700010" lon="-79.0852010">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:25:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0699820" lon="-79.0852370">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:25:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0699660" lon="-79.0852690">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:25:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0699470" lon="-79.0853040">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:25:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0699280" lon="-79.0853350">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:25:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0699100" lon="-79.0853620">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:25:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0698850" lon="-79.0854010">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:25:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0698750" lon="-79.0854140">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:25:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0698520" lon="-79.0854490">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:25:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0698440" lon="-79.0854600">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:25:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0698220" lon="-79.0855070">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:25:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0698140" lon="-79.0855260">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:25:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0698060" lon="-79.0855670">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:25:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0698000" lon="-79.0856060">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:25:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0697960" lon="-79.0856460">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:25:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0697930" lon="-79.0856880">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:25:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0697930" lon="-79.0857310">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:25:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0697930" lon="-79.0857760">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:25:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0697920" lon="-79.0858180">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:26:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0697890" lon="-79.0858600">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:26:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0697840" lon="-79.0859040">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:26:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0697780" lon="-79.0859480">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:26:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0697740" lon="-79.0860000">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:26:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0697700" lon="-79.0860550">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:26:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0697680" lon="-79.0861070">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:26:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0697640" lon="-79.0861550">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:26:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0697600" lon="-79.0862000">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:26:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0697570" lon="-79.0862430">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:26:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0697540" lon="-79.0862850">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:26:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0697530" lon="-79.0863240">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:26:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0697530" lon="-79.0863650">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:26:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0697520" lon="-79.0864080">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:26:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0697470" lon="-79.0864450">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:26:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0697390" lon="-79.0864810">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:26:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0697270" lon="-79.0865140">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:26:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0697170" lon="-79.0865480">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:26:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0697050" lon="-79.0865850">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:26:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0696930" lon="-79.0866250">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:26:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0696790" lon="-79.0866640">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:26:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0696670" lon="-79.0867020">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:26:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0696550" lon="-79.0867390">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:26:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0696500" lon="-79.0867760">
//     <ele>156.0</ele>
//     <time>2020-05-19T15:26:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0696420" lon="-79.0868150">
//     <ele>156.1</ele>
//     <time>2020-05-19T15:26:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0696320" lon="-79.0868520">
//     <ele>156.1</ele>
//     <time>2020-05-19T15:26:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0696170" lon="-79.0868900">
//     <ele>156.2</ele>
//     <time>2020-05-19T15:26:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0696050" lon="-79.0869270">
//     <ele>156.2</ele>
//     <time>2020-05-19T15:26:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0695950" lon="-79.0869730">
//     <ele>156.3</ele>
//     <time>2020-05-19T15:26:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0695930" lon="-79.0869870">
//     <ele>156.3</ele>
//     <time>2020-05-19T15:26:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0695860" lon="-79.0870330">
//     <ele>156.4</ele>
//     <time>2020-05-19T15:26:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0695830" lon="-79.0870510">
//     <ele>156.4</ele>
//     <time>2020-05-19T15:26:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0695740" lon="-79.0870920">
//     <ele>156.5</ele>
//     <time>2020-05-19T15:26:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0695600" lon="-79.0871350">
//     <ele>156.6</ele>
//     <time>2020-05-19T15:26:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0695440" lon="-79.0871710">
//     <ele>156.7</ele>
//     <time>2020-05-19T15:26:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0695320" lon="-79.0872050">
//     <ele>156.7</ele>
//     <time>2020-05-19T15:26:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0695190" lon="-79.0872390">
//     <ele>156.8</ele>
//     <time>2020-05-19T15:26:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0695070" lon="-79.0872770">
//     <ele>156.9</ele>
//     <time>2020-05-19T15:26:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0694970" lon="-79.0873120">
//     <ele>157.0</ele>
//     <time>2020-05-19T15:26:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0694910" lon="-79.0873500">
//     <ele>157.1</ele>
//     <time>2020-05-19T15:26:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0694850" lon="-79.0873910">
//     <ele>157.2</ele>
//     <time>2020-05-19T15:26:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0694810" lon="-79.0874340">
//     <ele>157.4</ele>
//     <time>2020-05-19T15:26:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0694800" lon="-79.0874760">
//     <ele>157.5</ele>
//     <time>2020-05-19T15:26:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0694800" lon="-79.0875170">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:26:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0694990" lon="-79.0875610">
//     <ele>157.7</ele>
//     <time>2020-05-19T15:26:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0695100" lon="-79.0875750">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:26:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0695440" lon="-79.0876010">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:26:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0695840" lon="-79.0876200">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:26:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0696200" lon="-79.0876360">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:26:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0696570" lon="-79.0876500">
//     <ele>157.8</ele>
//     <time>2020-05-19T15:26:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0696920" lon="-79.0876550">
//     <ele>157.7</ele>
//     <time>2020-05-19T15:26:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0697260" lon="-79.0876610">
//     <ele>157.7</ele>
//     <time>2020-05-19T15:26:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0697610" lon="-79.0876660">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:26:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0697950" lon="-79.0876710">
//     <ele>157.5</ele>
//     <time>2020-05-19T15:26:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0698270" lon="-79.0876760">
//     <ele>157.4</ele>
//     <time>2020-05-19T15:26:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0698550" lon="-79.0876860">
//     <ele>157.3</ele>
//     <time>2020-05-19T15:26:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0698840" lon="-79.0877000">
//     <ele>157.2</ele>
//     <time>2020-05-19T15:26:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0699160" lon="-79.0877190">
//     <ele>157.0</ele>
//     <time>2020-05-19T15:26:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0699430" lon="-79.0877350">
//     <ele>156.8</ele>
//     <time>2020-05-19T15:26:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0699690" lon="-79.0877490">
//     <ele>156.6</ele>
//     <time>2020-05-19T15:26:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0699980" lon="-79.0877630">
//     <ele>156.4</ele>
//     <time>2020-05-19T15:27:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0700300" lon="-79.0877780">
//     <ele>156.2</ele>
//     <time>2020-05-19T15:27:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0700620" lon="-79.0877980">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:27:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0700960" lon="-79.0878150">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:27:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0701320" lon="-79.0878270">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:27:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0701660" lon="-79.0878370">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:27:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0701940" lon="-79.0878500">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:27:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0702270" lon="-79.0878610">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:27:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0702580" lon="-79.0878740">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:27:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0702920" lon="-79.0878860">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:27:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0703290" lon="-79.0878990">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:27:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0703660" lon="-79.0879100">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:27:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0704000" lon="-79.0879240">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:27:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0704360" lon="-79.0879390">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:27:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0704690" lon="-79.0879450">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:27:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0705020" lon="-79.0879430">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:27:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0705380" lon="-79.0879400">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:27:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0705770" lon="-79.0879380">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:27:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0706170" lon="-79.0879260">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0706590" lon="-79.0879160">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:27:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0707080" lon="-79.0879070">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:27:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0707510" lon="-79.0879010">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0707930" lon="-79.0878950">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0708360" lon="-79.0878920">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:27:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0708770" lon="-79.0878940">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:27:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0709130" lon="-79.0879020">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:27:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0709510" lon="-79.0879140">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:27:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0709880" lon="-79.0879300">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:27:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0710250" lon="-79.0879490">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:27:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0710550" lon="-79.0879690">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:27:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0710880" lon="-79.0879930">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:27:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0711190" lon="-79.0880190">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:27:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0711450" lon="-79.0880460">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:27:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0711720" lon="-79.0880720">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:27:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0711960" lon="-79.0880970">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:27:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0712200" lon="-79.0881230">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:27:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0712450" lon="-79.0881520">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:27:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0712710" lon="-79.0881830">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:27:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0712940" lon="-79.0882160">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:27:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0712980" lon="-79.0882530">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:27:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0712890" lon="-79.0882900">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:27:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0712650" lon="-79.0883260">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:27:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0712330" lon="-79.0883650">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:27:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0712000" lon="-79.0884060">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0711730" lon="-79.0884390">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0711480" lon="-79.0884700">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0711270" lon="-79.0885060">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0711040" lon="-79.0885470">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0710810" lon="-79.0885910">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0710580" lon="-79.0886290">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0710400" lon="-79.0886640">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0710250" lon="-79.0886990">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0710080" lon="-79.0887400">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0709880" lon="-79.0887850">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0709630" lon="-79.0888280">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:27:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0709430" lon="-79.0888640">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:27:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0709220" lon="-79.0888970">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:27:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0709000" lon="-79.0889290">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:27:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0708780" lon="-79.0889690">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:27:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0708540" lon="-79.0890110">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:27:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0708330" lon="-79.0890490">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0708130" lon="-79.0890860">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0707890" lon="-79.0891170">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0707670" lon="-79.0891510">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0707480" lon="-79.0891880">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0707340" lon="-79.0892290">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0707210" lon="-79.0892710">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:28:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0707150" lon="-79.0893150">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:28:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0707080" lon="-79.0893570">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:28:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0707000" lon="-79.0893990">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0706890" lon="-79.0894410">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0706790" lon="-79.0894840">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0706700" lon="-79.0895270">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0706620" lon="-79.0895620">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0706520" lon="-79.0896020">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0706480" lon="-79.0896140">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0706420" lon="-79.0896600">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0706400" lon="-79.0896770">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0706410" lon="-79.0897180">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0706420" lon="-79.0897320">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0706440" lon="-79.0897770">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0706440" lon="-79.0897930">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0706400" lon="-79.0898290">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0706360" lon="-79.0898640">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0706340" lon="-79.0898990">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0706340" lon="-79.0899380">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0706320" lon="-79.0899820">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0706260" lon="-79.0900240">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:28:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0706170" lon="-79.0900580">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:28:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0705950" lon="-79.0900970">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:28:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0705840" lon="-79.0901120">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0705590" lon="-79.0901490">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0705360" lon="-79.0901840">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0705170" lon="-79.0902180">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0704970" lon="-79.0902530">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0704770" lon="-79.0902940">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0704560" lon="-79.0903380">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0704390" lon="-79.0903730">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0704190" lon="-79.0904070">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0703940" lon="-79.0904420">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0703770" lon="-79.0904780">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0703700" lon="-79.0905170">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0703710" lon="-79.0905640">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0703790" lon="-79.0906110">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0703890" lon="-79.0906490">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0704040" lon="-79.0906870">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:28:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0704210" lon="-79.0907300">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0704370" lon="-79.0907730">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:28:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0704460" lon="-79.0908150">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:28:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0704400" lon="-79.0908660">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:28:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0704270" lon="-79.0909210">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0704130" lon="-79.0909700">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:28:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0704070" lon="-79.0910080">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:28:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0704130" lon="-79.0910500">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:28:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0704300" lon="-79.0910950">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:28:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0704460" lon="-79.0911340">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:28:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0704640" lon="-79.0911690">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:28:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0704830" lon="-79.0911990">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:28:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0705060" lon="-79.0912270">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:28:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0705300" lon="-79.0912530">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:28:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0705530" lon="-79.0912760">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:29:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0705780" lon="-79.0913020">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:29:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0706040" lon="-79.0913250">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:29:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0706270" lon="-79.0913490">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:29:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0706460" lon="-79.0913840">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:29:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0706650" lon="-79.0914190">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:29:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0706790" lon="-79.0914570">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:29:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0706930" lon="-79.0914960">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0707060" lon="-79.0915360">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0707220" lon="-79.0915760">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0707370" lon="-79.0916190">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0707520" lon="-79.0916590">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0707680" lon="-79.0916980">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0707830" lon="-79.0917280">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0708030" lon="-79.0917540">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0708240" lon="-79.0917860">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0708480" lon="-79.0918200">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0708750" lon="-79.0918550">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0709040" lon="-79.0918930">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0709300" lon="-79.0919300">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0709520" lon="-79.0919730">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0709700" lon="-79.0920170">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0709920" lon="-79.0920600">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0710140" lon="-79.0920980">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0710360" lon="-79.0921340">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0710560" lon="-79.0921680">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0710760" lon="-79.0921960">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0711000" lon="-79.0922230">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0711270" lon="-79.0922480">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0711490" lon="-79.0922710">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0711710" lon="-79.0922980">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0711920" lon="-79.0923310">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0712080" lon="-79.0923700">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0712220" lon="-79.0924090">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0712280" lon="-79.0924450">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0712330" lon="-79.0924890">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:29:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0712390" lon="-79.0925380">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0712490" lon="-79.0925840">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0712580" lon="-79.0926290">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0712680" lon="-79.0926780">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0712730" lon="-79.0927300">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0712730" lon="-79.0927780">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0712740" lon="-79.0928280">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0712820" lon="-79.0928710">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0712970" lon="-79.0929080">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0713120" lon="-79.0929470">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0713260" lon="-79.0929850">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0713350" lon="-79.0930260">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0713430" lon="-79.0930700">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0713480" lon="-79.0931150">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0713550" lon="-79.0931590">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0713670" lon="-79.0932030">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0713890" lon="-79.0932440">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0714160" lon="-79.0932800">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0714410" lon="-79.0933110">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:29:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0714640" lon="-79.0933410">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:29:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0714810" lon="-79.0933760">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:29:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0714920" lon="-79.0934160">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:29:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0715070" lon="-79.0934580">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:29:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0715180" lon="-79.0934950">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:29:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0715250" lon="-79.0935400">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0715250" lon="-79.0935580">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0715230" lon="-79.0935940">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0715190" lon="-79.0936350">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0715170" lon="-79.0936750">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0715110" lon="-79.0937160">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0715030" lon="-79.0937580">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0714880" lon="-79.0938010">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0714750" lon="-79.0938450">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0714680" lon="-79.0938890">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0714760" lon="-79.0939300">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0714820" lon="-79.0939450">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0714900" lon="-79.0939800">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0714970" lon="-79.0940270">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0714990" lon="-79.0940810">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:30:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0715000" lon="-79.0941350">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:30:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0715000" lon="-79.0941850">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:30:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0715060" lon="-79.0942360">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:30:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0715110" lon="-79.0942860">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:30:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0715160" lon="-79.0943390">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:30:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0715190" lon="-79.0943870">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:30:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0715140" lon="-79.0944390">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:30:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0715040" lon="-79.0944950">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0714910" lon="-79.0945470">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0714770" lon="-79.0945950">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0714650" lon="-79.0946390">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0714640" lon="-79.0946870">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0714700" lon="-79.0947350">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0714810" lon="-79.0947760">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0714940" lon="-79.0948180">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0715040" lon="-79.0948610">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0715160" lon="-79.0949000">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0715250" lon="-79.0949360">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0715320" lon="-79.0949690">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0715330" lon="-79.0950070">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0715330" lon="-79.0950490">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0715310" lon="-79.0950940">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0715290" lon="-79.0951440">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0715280" lon="-79.0951850">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0715280" lon="-79.0952230">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0715250" lon="-79.0952700">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0715220" lon="-79.0953150">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0715190" lon="-79.0953580">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0715180" lon="-79.0954020">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0715180" lon="-79.0954160">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0715190" lon="-79.0954500">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0715270" lon="-79.0954930">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0715400" lon="-79.0955390">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0715580" lon="-79.0955770">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0715780" lon="-79.0956100">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0715950" lon="-79.0956370">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:30:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0716240" lon="-79.0956760">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:30:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0716360" lon="-79.0956900">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:30:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0716620" lon="-79.0957200">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:30:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0716840" lon="-79.0957510">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:30:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0716970" lon="-79.0957870">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:30:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0717020" lon="-79.0958310">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:30:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0717000" lon="-79.0958770">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:30:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0716940" lon="-79.0959230">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:30:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0716830" lon="-79.0959680">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:30:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0716730" lon="-79.0960110">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:31:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0716650" lon="-79.0960490">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:31:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0716550" lon="-79.0960860">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:31:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0716550" lon="-79.0961220">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:31:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0716580" lon="-79.0961600">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:31:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0716710" lon="-79.0962000">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0716840" lon="-79.0962370">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0716920" lon="-79.0962720">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:31:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0717010" lon="-79.0963210">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:31:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0717020" lon="-79.0963380">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:31:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0717020" lon="-79.0963790">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:31:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0717050" lon="-79.0964150">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:31:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0717030" lon="-79.0964530">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:31:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0716960" lon="-79.0965000">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:31:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0716940" lon="-79.0965410">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:31:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0716960" lon="-79.0965780">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:31:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0717030" lon="-79.0966160">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:31:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0717100" lon="-79.0966580">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:31:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0717140" lon="-79.0967010">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:31:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0717160" lon="-79.0967380">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:31:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0717180" lon="-79.0967790">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:31:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0717210" lon="-79.0968220">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:31:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0717270" lon="-79.0968690">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:31:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0717340" lon="-79.0969150">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:31:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0717400" lon="-79.0969650">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:31:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0717510" lon="-79.0970130">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:31:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0717680" lon="-79.0970550">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:31:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0717880" lon="-79.0970910">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:31:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0718100" lon="-79.0971200">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:31:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0718310" lon="-79.0971570">
//     <ele>151.7</ele>
//     <time>2020-05-19T15:31:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0718490" lon="-79.0971990">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:31:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0718630" lon="-79.0972420">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:31:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0718780" lon="-79.0972780">
//     <ele>151.8</ele>
//     <time>2020-05-19T15:31:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0718980" lon="-79.0973160">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:31:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0719190" lon="-79.0973480">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:31:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0719420" lon="-79.0973740">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:31:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0719660" lon="-79.0974060">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:31:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0719890" lon="-79.0974350">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:31:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0720160" lon="-79.0974630">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:31:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0720490" lon="-79.0974920">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:31:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0720810" lon="-79.0975200">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:31:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0721150" lon="-79.0975470">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:31:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0721520" lon="-79.0975710">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:31:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0721910" lon="-79.0975860">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:31:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0722340" lon="-79.0975950">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:31:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0722780" lon="-79.0975970">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:31:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0723210" lon="-79.0975950">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:31:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0723560" lon="-79.0975880">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0723890" lon="-79.0975780">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0724260" lon="-79.0975700">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0724630" lon="-79.0975630">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0724990" lon="-79.0975710">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0725320" lon="-79.0975840">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0725650" lon="-79.0975980">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0726020" lon="-79.0976120">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0726310" lon="-79.0976220">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0726550" lon="-79.0976400">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0726870" lon="-79.0976660">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0726960" lon="-79.0976750">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0727260" lon="-79.0977000">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:31:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0727350" lon="-79.0977090">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0727530" lon="-79.0977500">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0727570" lon="-79.0977670">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0727590" lon="-79.0978010">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0727640" lon="-79.0978470">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0727660" lon="-79.0978630">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0727720" lon="-79.0978980">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0727850" lon="-79.0979400">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:32:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0727880" lon="-79.0979550">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:32:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0727960" lon="-79.0979980">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:32:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0727980" lon="-79.0980130">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:32:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0727990" lon="-79.0980580">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:32:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0727980" lon="-79.0980740">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:32:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0727920" lon="-79.0981110">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:32:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0727820" lon="-79.0981460">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:32:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0727630" lon="-79.0981890">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0727550" lon="-79.0982020">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0727360" lon="-79.0982270">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0727150" lon="-79.0982500">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0726970" lon="-79.0982750">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:32:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0726800" lon="-79.0983030">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0726650" lon="-79.0983320">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0726510" lon="-79.0983670">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0726360" lon="-79.0984010">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0726260" lon="-79.0984320">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0726170" lon="-79.0984660">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:32:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0726120" lon="-79.0985140">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0726100" lon="-79.0985310">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0726030" lon="-79.0985690">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0725920" lon="-79.0986080">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0725760" lon="-79.0986450">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0725570" lon="-79.0986830">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0725370" lon="-79.0987190">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0725150" lon="-79.0987530">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0724910" lon="-79.0987880">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0724660" lon="-79.0988230">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0724460" lon="-79.0988600">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0724330" lon="-79.0988980">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:32:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0724250" lon="-79.0989370">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:32:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0724190" lon="-79.0989850">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:32:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0724130" lon="-79.0990360">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:32:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0724090" lon="-79.0990820">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0724080" lon="-79.0990960">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0724110" lon="-79.0991380">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0724130" lon="-79.0991760">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0724160" lon="-79.0992200">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0724230" lon="-79.0992650">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:32:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0724410" lon="-79.0993010">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:32:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0724630" lon="-79.0993210">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:32:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0724920" lon="-79.0993320">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:32:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0725210" lon="-79.0993420">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:32:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0725510" lon="-79.0993560">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:32:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0725750" lon="-79.0993750">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:32:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0725990" lon="-79.0994040">
//     <ele>151.9</ele>
//     <time>2020-05-19T15:32:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0726200" lon="-79.0994390">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0726380" lon="-79.0994760">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0726490" lon="-79.0995100">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0726620" lon="-79.0995600">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0726670" lon="-79.0995790">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0726730" lon="-79.0996200">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:32:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0726750" lon="-79.0996620">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:33:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0726720" lon="-79.0997040">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:33:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0726680" lon="-79.0997450">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:33:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0726580" lon="-79.0997860">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:33:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0726470" lon="-79.0998280">
//     <ele>152.0</ele>
//     <time>2020-05-19T15:33:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0726440" lon="-79.0998700">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0726470" lon="-79.0999150">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0726520" lon="-79.0999650">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0726610" lon="-79.1000110">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0726680" lon="-79.1000530">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0726770" lon="-79.1000990">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0726800" lon="-79.1001170">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0726890" lon="-79.1001650">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0726990" lon="-79.1002200">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0727120" lon="-79.1002700">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0727290" lon="-79.1003230">
//     <ele>152.1</ele>
//     <time>2020-05-19T15:33:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0727480" lon="-79.1003720">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:33:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0727660" lon="-79.1004080">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:33:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0727850" lon="-79.1004440">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:33:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0728070" lon="-79.1004840">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:33:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0728290" lon="-79.1005240">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:33:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0728510" lon="-79.1005580">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:33:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0728750" lon="-79.1005880">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:33:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0728980" lon="-79.1006170">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:33:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0729240" lon="-79.1006440">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:33:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0729480" lon="-79.1006660">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:33:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0729730" lon="-79.1006880">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:33:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0730000" lon="-79.1007130">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:33:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0730240" lon="-79.1007400">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:33:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0730460" lon="-79.1007680">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:33:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0730650" lon="-79.1007960">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:33:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0730800" lon="-79.1008240">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:33:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0730940" lon="-79.1008530">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:33:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0731100" lon="-79.1008830">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:33:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0731250" lon="-79.1009170">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:33:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0731350" lon="-79.1009560">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:33:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0731400" lon="-79.1009930">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:33:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0731380" lon="-79.1010320">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:33:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0731300" lon="-79.1010650">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:33:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0731060" lon="-79.1010970">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:33:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0730950" lon="-79.1011070">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:33:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0730580" lon="-79.1011220">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:33:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0730440" lon="-79.1011240">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:33:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0730160" lon="-79.1011250">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:33:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0729850" lon="-79.1011230">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:33:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0729500" lon="-79.1011260">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:33:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0729170" lon="-79.1011290">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:33:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0728830" lon="-79.1011330">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:33:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0728480" lon="-79.1011340">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:33:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0728190" lon="-79.1011370">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:33:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0727910" lon="-79.1011420">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:33:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0727570" lon="-79.1011540">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:33:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0727220" lon="-79.1011680">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:33:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0726940" lon="-79.1011780">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:33:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0726640" lon="-79.1011870">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:33:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0726530" lon="-79.1011900">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:33:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0726260" lon="-79.1012100">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:33:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0726190" lon="-79.1012200">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:33:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0726150" lon="-79.1012640">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:33:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0726160" lon="-79.1012810">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:33:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0726210" lon="-79.1013160">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:34:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0726270" lon="-79.1013520">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:34:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0726330" lon="-79.1013900">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:34:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0726460" lon="-79.1014350">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:34:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0726500" lon="-79.1014510">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:34:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0726590" lon="-79.1014880">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:34:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0726650" lon="-79.1015230">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:34:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0726750" lon="-79.1015680">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:34:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0726780" lon="-79.1015820">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:34:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0726800" lon="-79.1016280">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:34:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0726800" lon="-79.1016440">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:34:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0726700" lon="-79.1016790">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:34:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0726530" lon="-79.1017150">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:34:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0726290" lon="-79.1017380">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:34:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0725980" lon="-79.1017550">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:34:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0725610" lon="-79.1017680">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:34:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0725270" lon="-79.1017730">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:34:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0724900" lon="-79.1017950">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:34:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0724770" lon="-79.1018040">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:34:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0724560" lon="-79.1018300">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:34:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0724420" lon="-79.1018650">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:34:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0724310" lon="-79.1019070">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:34:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0724190" lon="-79.1019540">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:34:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0724070" lon="-79.1020000">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:34:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0724010" lon="-79.1020350">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:34:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0723990" lon="-79.1020690">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:34:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0723970" lon="-79.1021110">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:34:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0723930" lon="-79.1021560">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:34:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0723790" lon="-79.1021980">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:34:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0723640" lon="-79.1022280">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:34:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0723450" lon="-79.1022540">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:34:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0723250" lon="-79.1022870">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:34:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0723080" lon="-79.1023230">
//     <ele>155.8</ele>
//     <time>2020-05-19T15:34:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0722930" lon="-79.1023620">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:34:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0722830" lon="-79.1024020">
//     <ele>156.0</ele>
//     <time>2020-05-19T15:34:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0722760" lon="-79.1024400">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:34:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0722720" lon="-79.1024810">
//     <ele>155.9</ele>
//     <time>2020-05-19T15:34:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0722730" lon="-79.1025230">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:34:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0722750" lon="-79.1025640">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:34:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0722730" lon="-79.1026060">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:34:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0722710" lon="-79.1026500">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:34:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0722720" lon="-79.1026900">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:34:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0722820" lon="-79.1027380">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:34:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0722860" lon="-79.1027540">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:34:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0722960" lon="-79.1027860">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:34:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0723110" lon="-79.1028320">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:34:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0723160" lon="-79.1028490">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:34:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0723260" lon="-79.1028910">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:34:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0723330" lon="-79.1029350">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:34:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0723370" lon="-79.1029730">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:34:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0723430" lon="-79.1030100">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:34:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0723520" lon="-79.1030460">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:34:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0723620" lon="-79.1030770">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:34:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0723740" lon="-79.1031140">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:34:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0723880" lon="-79.1031560">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:34:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0724010" lon="-79.1031980">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:34:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0724150" lon="-79.1032410">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:34:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0724320" lon="-79.1032840">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:34:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0724460" lon="-79.1033230">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:34:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0724630" lon="-79.1033610">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:34:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0724820" lon="-79.1033990">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:35:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0725010" lon="-79.1034340">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:35:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0725140" lon="-79.1034790">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:35:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0725170" lon="-79.1034940">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:35:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0725260" lon="-79.1035300">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:35:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0725320" lon="-79.1035710">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:35:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0725440" lon="-79.1036100">
//     <ele>152.2</ele>
//     <time>2020-05-19T15:35:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0725550" lon="-79.1036520">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:35:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0725770" lon="-79.1036940">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:35:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0726020" lon="-79.1037360">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:35:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0726300" lon="-79.1037660">
//     <ele>152.3</ele>
//     <time>2020-05-19T15:35:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0726600" lon="-79.1037910">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:35:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0726920" lon="-79.1038110">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:35:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0727250" lon="-79.1038290">
//     <ele>152.4</ele>
//     <time>2020-05-19T15:35:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0727590" lon="-79.1038440">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:35:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0727900" lon="-79.1038670">
//     <ele>152.5</ele>
//     <time>2020-05-19T15:35:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0728210" lon="-79.1039020">
//     <ele>152.6</ele>
//     <time>2020-05-19T15:35:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0728500" lon="-79.1039290">
//     <ele>152.7</ele>
//     <time>2020-05-19T15:35:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0728690" lon="-79.1039680">
//     <ele>152.8</ele>
//     <time>2020-05-19T15:35:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0728940" lon="-79.1039990">
//     <ele>152.9</ele>
//     <time>2020-05-19T15:35:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0729150" lon="-79.1040380">
//     <ele>153.0</ele>
//     <time>2020-05-19T15:35:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0729410" lon="-79.1040720">
//     <ele>153.1</ele>
//     <time>2020-05-19T15:35:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0729720" lon="-79.1040930">
//     <ele>153.2</ele>
//     <time>2020-05-19T15:35:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0730090" lon="-79.1041110">
//     <ele>153.3</ele>
//     <time>2020-05-19T15:35:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0730400" lon="-79.1041370">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:35:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0730650" lon="-79.1041640">
//     <ele>153.4</ele>
//     <time>2020-05-19T15:35:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0730900" lon="-79.1041950">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:35:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0731210" lon="-79.1042210">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0731530" lon="-79.1042460">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0731880" lon="-79.1042690">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0732210" lon="-79.1042900">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0732530" lon="-79.1043130">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0732880" lon="-79.1043280">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0733190" lon="-79.1043370">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0733470" lon="-79.1043470">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0733810" lon="-79.1043510">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0734150" lon="-79.1043590">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0734390" lon="-79.1043820">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0734580" lon="-79.1044090">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0734640" lon="-79.1044350">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0734660" lon="-79.1044510">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0734550" lon="-79.1044940">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0734510" lon="-79.1045100">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0734290" lon="-79.1045480">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0734190" lon="-79.1045610">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0733990" lon="-79.1045910">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0733850" lon="-79.1046200">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0733570" lon="-79.1046550">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:35:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0733470" lon="-79.1046660">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:35:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0733250" lon="-79.1046880">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0732960" lon="-79.1047130">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0732870" lon="-79.1047210">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0732650" lon="-79.1047540">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:35:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0732580" lon="-79.1047670">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0732430" lon="-79.1047990">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:35:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0732270" lon="-79.1048420">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:35:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0732210" lon="-79.1048550">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:35:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0732070" lon="-79.1049020">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:35:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0732020" lon="-79.1049190">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:35:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0731960" lon="-79.1049550">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:35:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0731930" lon="-79.1049970">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:36:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0731910" lon="-79.1050100">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:36:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0731880" lon="-79.1050540">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:36:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0731850" lon="-79.1050700">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:36:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0731770" lon="-79.1051030">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:36:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0731700" lon="-79.1051370">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:36:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0731570" lon="-79.1051750">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:36:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0731530" lon="-79.1052150">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:36:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0731560" lon="-79.1052540">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:36:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0731610" lon="-79.1052940">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:36:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0731670" lon="-79.1053370">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:36:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0731660" lon="-79.1053860">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:36:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0731630" lon="-79.1054350">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:36:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0731610" lon="-79.1054690">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:36:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0731520" lon="-79.1055120">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:36:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0731480" lon="-79.1055280">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:36:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0731410" lon="-79.1055610">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:36:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0731350" lon="-79.1056030">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:36:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0731340" lon="-79.1056180">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:36:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0731340" lon="-79.1056550">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:36:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0731380" lon="-79.1056950">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:36:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0731470" lon="-79.1057360">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:36:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0731560" lon="-79.1057850">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:36:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0731630" lon="-79.1058360">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:36:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0731670" lon="-79.1058800">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:36:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0731740" lon="-79.1059210">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:36:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0731840" lon="-79.1059580">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:36:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0731950" lon="-79.1059960">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:36:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0732060" lon="-79.1060320">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:36:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0732170" lon="-79.1060690">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:36:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0732250" lon="-79.1061120">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:36:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0732260" lon="-79.1061610">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:36:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0732220" lon="-79.1062070">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:36:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0732240" lon="-79.1062460">
//     <ele>154.9</ele>
//     <time>2020-05-19T15:36:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0732270" lon="-79.1062830">
//     <ele>154.8</ele>
//     <time>2020-05-19T15:36:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0732380" lon="-79.1063250">
//     <ele>154.7</ele>
//     <time>2020-05-19T15:36:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0732480" lon="-79.1063700">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:36:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0732490" lon="-79.1064100">
//     <ele>154.5</ele>
//     <time>2020-05-19T15:36:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0732480" lon="-79.1064570">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:36:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0732470" lon="-79.1064720">
//     <ele>154.4</ele>
//     <time>2020-05-19T15:36:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0732460" lon="-79.1065210">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:36:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0732460" lon="-79.1065370">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:36:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0732510" lon="-79.1065750">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:36:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0732510" lon="-79.1066180">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:36:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0732530" lon="-79.1066580">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:36:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0732490" lon="-79.1067020">
//     <ele>154.0</ele>
//     <time>2020-05-19T15:36:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0732390" lon="-79.1067510">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:36:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0732290" lon="-79.1067960">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:36:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0732240" lon="-79.1068330">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:36:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0732160" lon="-79.1068710">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:36:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0732080" lon="-79.1069090">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:36:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0732010" lon="-79.1069480">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:36:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0731940" lon="-79.1069850">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:36:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0731890" lon="-79.1070270">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:36:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0731860" lon="-79.1070400">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:36:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0731770" lon="-79.1070760">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:36:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0731600" lon="-79.1071160">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:36:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0731370" lon="-79.1071570">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:36:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0731110" lon="-79.1071940">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:36:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0730820" lon="-79.1072280">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:36:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0730460" lon="-79.1072610">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:37:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0730100" lon="-79.1072890">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:37:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0729800" lon="-79.1073100">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:37:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0729480" lon="-79.1073290">
//     <ele>153.5</ele>
//     <time>2020-05-19T15:37:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0729370" lon="-79.1073340">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0729090" lon="-79.1073460">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0728780" lon="-79.1073650">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0728460" lon="-79.1073910">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0728160" lon="-79.1074220">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0727910" lon="-79.1074560">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0727680" lon="-79.1074900">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0727470" lon="-79.1075270">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0727240" lon="-79.1075660">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0726980" lon="-79.1076080">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0726730" lon="-79.1076440">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0726510" lon="-79.1076730">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0726230" lon="-79.1077060">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0725960" lon="-79.1077350">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0725680" lon="-79.1077630">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0725380" lon="-79.1077940">
//     <ele>153.6</ele>
//     <time>2020-05-19T15:37:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0725080" lon="-79.1078200">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:37:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0724800" lon="-79.1078390">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:37:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0724530" lon="-79.1078510">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:37:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0724230" lon="-79.1078580">
//     <ele>153.7</ele>
//     <time>2020-05-19T15:37:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0723900" lon="-79.1078610">
//     <ele>153.8</ele>
//     <time>2020-05-19T15:37:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0723590" lon="-79.1078610">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:37:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0723230" lon="-79.1078770">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:37:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0723120" lon="-79.1078850">
//     <ele>153.9</ele>
//     <time>2020-05-19T15:37:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0723000" lon="-79.1079140">
//     <ele>154.1</ele>
//     <time>2020-05-19T15:37:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0722920" lon="-79.1079520">
//     <ele>154.2</ele>
//     <time>2020-05-19T15:37:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0722880" lon="-79.1079920">
//     <ele>154.3</ele>
//     <time>2020-05-19T15:37:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0722790" lon="-79.1080310">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:37:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0722620" lon="-79.1080670">
//     <ele>154.6</ele>
//     <time>2020-05-19T15:37:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0722410" lon="-79.1080910">
//     <ele>155.0</ele>
//     <time>2020-05-19T15:37:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0722150" lon="-79.1081070">
//     <ele>155.1</ele>
//     <time>2020-05-19T15:37:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0721810" lon="-79.1081200">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:37:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0721690" lon="-79.1081240">
//     <ele>155.2</ele>
//     <time>2020-05-19T15:37:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0721490" lon="-79.1081320">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:37:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0721380" lon="-79.1081360">
//     <ele>155.3</ele>
//     <time>2020-05-19T15:37:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0721220" lon="-79.1081500">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:37:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0721150" lon="-79.1081610">
//     <ele>155.4</ele>
//     <time>2020-05-19T15:37:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0721090" lon="-79.1081710">
//     <ele>155.5</ele>
//     <time>2020-05-19T15:37:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0721000" lon="-79.1082080">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:37:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0720970" lon="-79.1082210">
//     <ele>155.6</ele>
//     <time>2020-05-19T15:37:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0720930" lon="-79.1082590">
//     <ele>155.7</ele>
//     <time>2020-05-19T15:37:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0720920" lon="-79.1083030">
//     <ele>156.0</ele>
//     <time>2020-05-19T15:37:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0720920" lon="-79.1083490">
//     <ele>156.2</ele>
//     <time>2020-05-19T15:37:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0720920" lon="-79.1083880">
//     <ele>156.4</ele>
//     <time>2020-05-19T15:37:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0720920" lon="-79.1084300">
//     <ele>156.6</ele>
//     <time>2020-05-19T15:37:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0720910" lon="-79.1084460">
//     <ele>156.7</ele>
//     <time>2020-05-19T15:37:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0720830" lon="-79.1084930">
//     <ele>156.9</ele>
//     <time>2020-05-19T15:37:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0720800" lon="-79.1085080">
//     <ele>157.0</ele>
//     <time>2020-05-19T15:37:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0720730" lon="-79.1085600">
//     <ele>157.2</ele>
//     <time>2020-05-19T15:37:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0720710" lon="-79.1085800">
//     <ele>157.2</ele>
//     <time>2020-05-19T15:37:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0720670" lon="-79.1086210">
//     <ele>157.4</ele>
//     <time>2020-05-19T15:37:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0720650" lon="-79.1086610">
//     <ele>157.5</ele>
//     <time>2020-05-19T15:37:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0720640" lon="-79.1086990">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:37:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0720620" lon="-79.1087320">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:37:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0720600" lon="-79.1087680">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:37:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0720650" lon="-79.1088100">
//     <ele>157.6</ele>
//     <time>2020-05-19T15:37:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0720820" lon="-79.1088480">
//     <ele>158.6</ele>
//     <time>2020-05-19T15:38:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0721090" lon="-79.1088800">
//     <ele>159.1</ele>
//     <time>2020-05-19T15:38:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0721400" lon="-79.1089030">
//     <ele>159.5</ele>
//     <time>2020-05-19T15:38:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0721810" lon="-79.1089040">
//     <ele>160.0</ele>
//     <time>2020-05-19T15:38:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0721940" lon="-79.1088990">
//     <ele>160.1</ele>
//     <time>2020-05-19T15:38:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0722220" lon="-79.1088820">
//     <ele>160.5</ele>
//     <time>2020-05-19T15:38:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0722510" lon="-79.1088600">
//     <ele>160.9</ele>
//     <time>2020-05-19T15:38:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0722860" lon="-79.1088430">
//     <ele>161.3</ele>
//     <time>2020-05-19T15:38:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0723260" lon="-79.1088280">
//     <ele>161.7</ele>
//     <time>2020-05-19T15:38:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0723670" lon="-79.1088170">
//     <ele>162.2</ele>
//     <time>2020-05-19T15:38:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0724070" lon="-79.1088090">
//     <ele>162.7</ele>
//     <time>2020-05-19T15:38:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0724440" lon="-79.1088030">
//     <ele>163.1</ele>
//     <time>2020-05-19T15:38:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0724780" lon="-79.1087980">
//     <ele>163.5</ele>
//     <time>2020-05-19T15:38:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0725080" lon="-79.1087950">
//     <ele>163.8</ele>
//     <time>2020-05-19T15:38:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0725420" lon="-79.1087830">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:38:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0725490" lon="-79.1087780">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:38:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0725550" lon="-79.1087690">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:38:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0725580" lon="-79.1087620">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:38:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0725620" lon="-79.1087580">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:38:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0725690" lon="-79.1087580">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:38:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0725690" lon="-79.1087650">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0725670" lon="-79.1087750">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0725630" lon="-79.1087880">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0725520" lon="-79.1088030">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0725400" lon="-79.1088200">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0725250" lon="-79.1088490">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0725200" lon="-79.1088600">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0725060" lon="-79.1088910">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0725010" lon="-79.1089000">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0724960" lon="-79.1089190">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0724970" lon="-79.1089410">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0725000" lon="-79.1089580">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0725010" lon="-79.1089760">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0725020" lon="-79.1090040">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:38:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0725010" lon="-79.1090150">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:38:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0725010" lon="-79.1090270">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:38:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0725020" lon="-79.1090460">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:38:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0725030" lon="-79.1090650">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:38:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0725050" lon="-79.1090830">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:38:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0725040" lon="-79.1091050">
//     <ele>165.4</ele>
//     <time>2020-05-19T15:38:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0725030" lon="-79.1091250">
//     <ele>165.4</ele>
//     <time>2020-05-19T15:38:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0725040" lon="-79.1091480">
//     <ele>165.4</ele>
//     <time>2020-05-19T15:38:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0725060" lon="-79.1091870">
//     <ele>165.4</ele>
//     <time>2020-05-19T15:38:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0725060" lon="-79.1092010">
//     <ele>165.5</ele>
//     <time>2020-05-19T15:38:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0725060" lon="-79.1092450">
//     <ele>165.5</ele>
//     <time>2020-05-19T15:38:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0725060" lon="-79.1092600">
//     <ele>165.5</ele>
//     <time>2020-05-19T15:38:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0725100" lon="-79.1093060">
//     <ele>165.6</ele>
//     <time>2020-05-19T15:38:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0725120" lon="-79.1093240">
//     <ele>165.6</ele>
//     <time>2020-05-19T15:38:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0725160" lon="-79.1093720">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:38:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0725170" lon="-79.1093890">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:38:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0725190" lon="-79.1094220">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:38:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0725210" lon="-79.1094730">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:38:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0725210" lon="-79.1094900">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:38:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0725170" lon="-79.1095270">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:38:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0725110" lon="-79.1095640">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:38:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0725080" lon="-79.1095990">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:38:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0725050" lon="-79.1096340">
//     <ele>165.9</ele>
//     <time>2020-05-19T15:38:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0725010" lon="-79.1096830">
//     <ele>165.9</ele>
//     <time>2020-05-19T15:38:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0725000" lon="-79.1096990">
//     <ele>165.9</ele>
//     <time>2020-05-19T15:38:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0724990" lon="-79.1097340">
//     <ele>165.9</ele>
//     <time>2020-05-19T15:38:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0724980" lon="-79.1097700">
//     <ele>165.9</ele>
//     <time>2020-05-19T15:39:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0724940" lon="-79.1098180">
//     <ele>165.9</ele>
//     <time>2020-05-19T15:39:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0724920" lon="-79.1098330">
//     <ele>165.9</ele>
//     <time>2020-05-19T15:39:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0724900" lon="-79.1098690">
//     <ele>165.9</ele>
//     <time>2020-05-19T15:39:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0724910" lon="-79.1099080">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:39:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0724920" lon="-79.1099480">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:39:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0724960" lon="-79.1099860">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:39:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0725050" lon="-79.1100260">
//     <ele>165.6</ele>
//     <time>2020-05-19T15:39:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0725140" lon="-79.1100660">
//     <ele>165.6</ele>
//     <time>2020-05-19T15:39:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0725190" lon="-79.1101050">
//     <ele>165.5</ele>
//     <time>2020-05-19T15:39:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0725230" lon="-79.1101450">
//     <ele>165.4</ele>
//     <time>2020-05-19T15:39:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0725240" lon="-79.1101850">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:39:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0725260" lon="-79.1102240">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:39:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0725310" lon="-79.1102610">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:39:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0725350" lon="-79.1102980">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:39:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0725360" lon="-79.1103420">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:39:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0725360" lon="-79.1103860">
//     <ele>165.0</ele>
//     <time>2020-05-19T15:39:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0725310" lon="-79.1104250">
//     <ele>165.0</ele>
//     <time>2020-05-19T15:39:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0725230" lon="-79.1104630">
//     <ele>164.9</ele>
//     <time>2020-05-19T15:39:18Z</time>
//    </trkpt>
//    <trkpt lat="36.0725190" lon="-79.1105030">
//     <ele>164.9</ele>
//     <time>2020-05-19T15:39:19Z</time>
//    </trkpt>
//    <trkpt lat="36.0725220" lon="-79.1105420">
//     <ele>164.9</ele>
//     <time>2020-05-19T15:39:20Z</time>
//    </trkpt>
//    <trkpt lat="36.0725300" lon="-79.1105780">
//     <ele>164.8</ele>
//     <time>2020-05-19T15:39:21Z</time>
//    </trkpt>
//    <trkpt lat="36.0725440" lon="-79.1106080">
//     <ele>164.8</ele>
//     <time>2020-05-19T15:39:22Z</time>
//    </trkpt>
//    <trkpt lat="36.0725600" lon="-79.1106380">
//     <ele>164.8</ele>
//     <time>2020-05-19T15:39:23Z</time>
//    </trkpt>
//    <trkpt lat="36.0725770" lon="-79.1106700">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:39:24Z</time>
//    </trkpt>
//    <trkpt lat="36.0725940" lon="-79.1107020">
//     <ele>164.7</ele>
//     <time>2020-05-19T15:39:25Z</time>
//    </trkpt>
//    <trkpt lat="36.0726120" lon="-79.1107320">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:39:26Z</time>
//    </trkpt>
//    <trkpt lat="36.0726290" lon="-79.1107600">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:39:27Z</time>
//    </trkpt>
//    <trkpt lat="36.0726570" lon="-79.1107970">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:39:28Z</time>
//    </trkpt>
//    <trkpt lat="36.0726660" lon="-79.1108110">
//     <ele>164.6</ele>
//     <time>2020-05-19T15:39:29Z</time>
//    </trkpt>
//    <trkpt lat="36.0726860" lon="-79.1108420">
//     <ele>164.5</ele>
//     <time>2020-05-19T15:39:30Z</time>
//    </trkpt>
//    <trkpt lat="36.0727050" lon="-79.1108710">
//     <ele>164.8</ele>
//     <time>2020-05-19T15:39:31Z</time>
//    </trkpt>
//    <trkpt lat="36.0727240" lon="-79.1108980">
//     <ele>164.8</ele>
//     <time>2020-05-19T15:39:32Z</time>
//    </trkpt>
//    <trkpt lat="36.0727420" lon="-79.1109280">
//     <ele>164.9</ele>
//     <time>2020-05-19T15:39:33Z</time>
//    </trkpt>
//    <trkpt lat="36.0727590" lon="-79.1109610">
//     <ele>164.9</ele>
//     <time>2020-05-19T15:39:34Z</time>
//    </trkpt>
//    <trkpt lat="36.0727770" lon="-79.1110020">
//     <ele>164.9</ele>
//     <time>2020-05-19T15:39:35Z</time>
//    </trkpt>
//    <trkpt lat="36.0727820" lon="-79.1110150">
//     <ele>165.0</ele>
//     <time>2020-05-19T15:39:36Z</time>
//    </trkpt>
//    <trkpt lat="36.0727900" lon="-79.1110500">
//     <ele>165.0</ele>
//     <time>2020-05-19T15:39:37Z</time>
//    </trkpt>
//    <trkpt lat="36.0727910" lon="-79.1110620">
//     <ele>165.0</ele>
//     <time>2020-05-19T15:39:38Z</time>
//    </trkpt>
//    <trkpt lat="36.0727920" lon="-79.1111000">
//     <ele>165.0</ele>
//     <time>2020-05-19T15:39:39Z</time>
//    </trkpt>
//    <trkpt lat="36.0727920" lon="-79.1111150">
//     <ele>165.0</ele>
//     <time>2020-05-19T15:39:40Z</time>
//    </trkpt>
//    <trkpt lat="36.0727860" lon="-79.1111480">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:39:41Z</time>
//    </trkpt>
//    <trkpt lat="36.0727780" lon="-79.1111810">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:39:42Z</time>
//    </trkpt>
//    <trkpt lat="36.0727670" lon="-79.1112200">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:39:43Z</time>
//    </trkpt>
//    <trkpt lat="36.0727630" lon="-79.1112320">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:39:44Z</time>
//    </trkpt>
//    <trkpt lat="36.0727580" lon="-79.1112560">
//     <ele>165.1</ele>
//     <time>2020-05-19T15:39:45Z</time>
//    </trkpt>
//    <trkpt lat="36.0727630" lon="-79.1112700">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:39:46Z</time>
//    </trkpt>
//    <trkpt lat="36.0727720" lon="-79.1112810">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:39:47Z</time>
//    </trkpt>
//    <trkpt lat="36.0727880" lon="-79.1112860">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:39:48Z</time>
//    </trkpt>
//    <trkpt lat="36.0728160" lon="-79.1112880">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:39:49Z</time>
//    </trkpt>
//    <trkpt lat="36.0728250" lon="-79.1112890">
//     <ele>165.2</ele>
//     <time>2020-05-19T15:39:50Z</time>
//    </trkpt>
//    <trkpt lat="36.0728570" lon="-79.1112910">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:39:51Z</time>
//    </trkpt>
//    <trkpt lat="36.0728700" lon="-79.1112920">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:39:52Z</time>
//    </trkpt>
//    <trkpt lat="36.0729020" lon="-79.1112970">
//     <ele>165.3</ele>
//     <time>2020-05-19T15:39:53Z</time>
//    </trkpt>
//    <trkpt lat="36.0729350" lon="-79.1113060">
//     <ele>165.4</ele>
//     <time>2020-05-19T15:39:54Z</time>
//    </trkpt>
//    <trkpt lat="36.0729700" lon="-79.1113200">
//     <ele>165.4</ele>
//     <time>2020-05-19T15:39:55Z</time>
//    </trkpt>
//    <trkpt lat="36.0730020" lon="-79.1113340">
//     <ele>165.5</ele>
//     <time>2020-05-19T15:39:56Z</time>
//    </trkpt>
//    <trkpt lat="36.0730410" lon="-79.1113510">
//     <ele>165.6</ele>
//     <time>2020-05-19T15:39:57Z</time>
//    </trkpt>
//    <trkpt lat="36.0730540" lon="-79.1113560">
//     <ele>165.6</ele>
//     <time>2020-05-19T15:39:58Z</time>
//    </trkpt>
//    <trkpt lat="36.0730880" lon="-79.1113670">
//     <ele>165.6</ele>
//     <time>2020-05-19T15:39:59Z</time>
//    </trkpt>
//    <trkpt lat="36.0730980" lon="-79.1113700">
//     <ele>165.6</ele>
//     <time>2020-05-19T15:40:00Z</time>
//    </trkpt>
//    <trkpt lat="36.0731090" lon="-79.1113730">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:01Z</time>
//    </trkpt>
//    <trkpt lat="36.0731120" lon="-79.1113780">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:02Z</time>
//    </trkpt>
//    <trkpt lat="36.0731130" lon="-79.1113840">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:03Z</time>
//    </trkpt>
//    <trkpt lat="36.0731130" lon="-79.1113910">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:04Z</time>
//    </trkpt>
//    <trkpt lat="36.0731140" lon="-79.1114000">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:05Z</time>
//    </trkpt>
//    <trkpt lat="36.0731120" lon="-79.1114080">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:06Z</time>
//    </trkpt>
//    <trkpt lat="36.0731080" lon="-79.1114060">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:07Z</time>
//    </trkpt>
//    <trkpt lat="36.0731060" lon="-79.1114050">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:08Z</time>
//    </trkpt>
//    <trkpt lat="36.0731050" lon="-79.1114040">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:09Z</time>
//    </trkpt>
//    <trkpt lat="36.0731050" lon="-79.1114020">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:10Z</time>
//    </trkpt>
//    <trkpt lat="36.0731060" lon="-79.1114010">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:11Z</time>
//    </trkpt>
//    <trkpt lat="36.0731060" lon="-79.1114010">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:12Z</time>
//    </trkpt>
//    <trkpt lat="36.0731060" lon="-79.1113950">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:13Z</time>
//    </trkpt>
//    <trkpt lat="36.0731060" lon="-79.1113920">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:14Z</time>
//    </trkpt>
//    <trkpt lat="36.0731030" lon="-79.1113890">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:15Z</time>
//    </trkpt>
//    <trkpt lat="36.0731020" lon="-79.1113920">
//     <ele>165.7</ele>
//     <time>2020-05-19T15:40:16Z</time>
//    </trkpt>
//    <trkpt lat="36.0731030" lon="-79.1113970">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:40:17Z</time>
//    </trkpt>
//    <trkpt lat="36.0731060" lon="-79.1114010">
//     <ele>165.8</ele>
//     <time>2020-05-19T15:40:18Z</time>
//    </trkpt>
//   </trkseg>
//  </trk>
// </gpx>
// `;

export default function App() {

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [file, setFile] = useState(null);
  const [parsed, setParsed] = useState([]);


  let fileReader;
  
  function handleFileChange(e) {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(e.target.files[0])
  }

  function handleFileRead(e) {
    setFile(fileReader.result)
  }

  function handleSubmit(e) {
    e.preventDefault();
    let gpx = GPX.parse(file);
    let compressed = compressArray(gpx.trk[0].trkseg[0].trkpt);
    setParsed(compressed);
  }


  function handleClick(index) {
    try {
      setSelectedPoint(index);
    } catch (error) {
      alert(error);
      setSelectedPoint(null);
    }
  };

  if (!parsed.length) {
    return (
      <Paper color="primary">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <TagTitle>Upload an activity file</TagTitle>
              <Form inline onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="gpxfile">.gpx only</Label>
                  <Input
                    id="gpxFile"
                    name="file"
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                  />
                </FormGroup>
                <button onClick={() => console.log(file)}>Upload</button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Paper>
    );
  }
return (
  <>
    <Container className="mb-5 p-3 p-md-5">
      <Row className="my-5">
        <Col xs={12}>
          <TagTitle>Afternoon Run</TagTitle>
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <Map
            color="success"
            zoom={10}
            points={parsed}
            selectedPoint={selectedPoint}
            handleClick={handleClick}
          />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <Elevation
            color="danger"
            points={parsed}
            selectedPoint={selectedPoint}
            handleClick={handleClick}
          />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <Pace points={parsed} color="info" handleClick={handleClick} />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <Splits points={parsed} />
        </Col>
      </Row>
    </Container>
  </>
);
  
};