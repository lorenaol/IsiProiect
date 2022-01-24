import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseService, ITestItem} from "@app/database/firebase";
import {Observable, Subscription} from "rxjs";
import {setDefaultOptions, loadModules} from 'esri-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild("mapViewNode", {static: true}) private mapViewEl: ElementRef | undefined;
  view: __esri.MapView | undefined;
  timeoutHandler = null

  _EsriConfig:any;
  _Map:any;
  _MapView:any;
  _FeatureLayer:any;
  _Graphic:any;
  _GraphicsLayer:any;
  _Route:any;
  _RouteParameters:any;
  _FeatureSet:any;


  map?: __esri.Map;
  pointGraphic?: __esri.Graphic;
  graphicsLayer?: __esri.GraphicsLayer;

  pointCoords: number[] = [-118.73682450024377, 34.07817583063242]; //[lng, lat]
  dir: number = 0;
  count: number = 0;

  subscriptionList?: Subscription;
  subscriptionObj?: Subscription;

  isConnected: boolean = false;

  item?: Observable<any>;


  constructor(private router: Router,   private fbs: FirebaseService) { }

  ngOnInit(): void {
    this.initializeMap().then(() => {
      // this.runTimer();
    }).catch((err) => {
      console.error(err);
      alert("An error occured while loading the map");
    })
  }

  clickMenu(): void {
    this.router.navigate(['/home']);
  }

  async initializeMap() {
    try {

      // before loading the modules for the first time,
      // also lazy load the CSS for the version of
      // the script that you're loading from the CDN
      setDefaultOptions({css: true, version: '4.22'});

      // Load the modules for the ArcGIS API for JavaScript
      const [EsriConfig, Map, MapView, FeatureLayer, Graphic, GraphicsLayer, Route, RouteParameters, FeatureSet] = await loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/rest/route",
        "esri/rest/support/RouteParameters",
        "esri/rest/support/FeatureSet"
      ])

      EsriConfig.apiKey = "AAPK2cb0a2dd99d14cf680225c402a82bb378Wgt-zuM2RVTV7g5jnbCe8BjvZpolYcSJyKwL-yUzVn4PtkUZXTqa6UnjI9xsHvr";
      this._EsriConfig = EsriConfig
      this._Map = Map;
      this._MapView = MapView;
      this._FeatureLayer = FeatureLayer;
      this._Graphic = Graphic;
      this._GraphicsLayer = GraphicsLayer;
      this._Route = Route;
      this._RouteParameters = RouteParameters;
      this._FeatureSet = FeatureSet;

      // Configure the Map
      const mapProperties = {
        basemap: "streets-vector"
      };

      this.map = new Map(mapProperties);

      // this.addFeatureLayers();

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl!.nativeElement,
        center: [	26.096306, 	44.439663],
        zoom: 1000,
        map: this.map
      };

      this.view = new MapView(mapViewProperties);

      // =================================================================
      const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

    } catch (error) {
      console.error("EsriLoader: ", error);
      console.error("EsriLoader: ", error);
      throw error;
    }
  }



  addFeatureLayers() {
    // Trailheads feature layer (points)
    var trailheadsLayer: __esri.FeatureLayer = new this._FeatureLayer({
      url:
        "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    this.map!.add(trailheadsLayer);


    // Trails feature layer (lines)
    var trailsLayer: __esri.FeatureLayer = new this._FeatureLayer({
      url:
        "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    });

    this.map!.add(trailsLayer, 0);

    // Parks and open spaces (polygons)
    var parksLayer: __esri.FeatureLayer = new this._FeatureLayer({
      url:
        "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });

    this.map!.add(parksLayer, 0);

    console.log("feature layers added");
  }



  // runTimer() {
  //   this.timeoutHandler = setTimeout(() => {
  //     // code to execute continuously until the view is closed
  //     // ...
  //     this.runTimer();
  //   }, 200);
  // }
  //
  // stopTimer() {
  //   if (this.timeoutHandler != null) {
  //     clearTimeout(this.timeoutHandler);
  //     this.timeoutHandler = null;
  //   }
  //
  // }


}
