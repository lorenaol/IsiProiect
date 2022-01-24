import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseService, ITestItem} from "@app/database/firebase";
import {Observable, Subscription} from "rxjs";
import {setDefaultOptions, loadModules} from 'esri-loader';
import {ContractService} from "@app/services/contract.service";
import {Contract} from "@app/entities/contract";
import {MapService} from "@app/services/map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild("mapViewNode", {static: true}) private mapViewEl?: ElementRef;
  view?: __esri.MapView;
  timeoutHandler : any = null;

  _EsriConfig : any;
  _Map: any;
  _MapView : any;
  _FeatureLayer : any;
  _Graphic : any;
  _GraphicsLayer: any;
  _Route: any;
  _RouteParameters : any;
  _FeatureSet: any;

  contract? :Contract;
  mapService = new MapService();


  map?: __esri.Map;

  constructor(
    private fbs: FirebaseService,
    private contractService: ContractService,
    private router: Router,
    // private mapService: MapService

  ) {

  }


  async initializeMap() {
    try {
      setDefaultOptions({css: true, version: '4.22'});

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

      this.addFeatureLayers();
      // this.addPoint(this.pointCoords[1], this.pointCoords[0]);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl?.nativeElement,
        center: [	24.53, 	44.79],
        zoom: 6,
        map: this.map
      };
      const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

      this.view = new MapView(mapViewProperties);

        this.view!.graphics.removeAll();
        console.log( this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][1])
      const point = { //Create a point
        type: "point",
        longitude:  this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][1],
        latitude:  this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][0]
      };
      const point2 = { //Create a point
        type: "point",
        longitude:  this.mapService.getCoords()[this.contract?.oferta?.locSosire!][1],
        latitude:  this.mapService.getCoords()[this.contract?.oferta?.locSosire!][0]
      };
      this.addGraphic("origin", point2);
      this.addGraphic("destination", point);
      this.getRoute(routeUrl);
      // const eventFunction = (event:any) => {
      //   console.log(event.mapPoint)
      //   if (this.view!.graphics.length === 0) {
      //     this.addGraphic("origin", point2);
      //   } else if (this.view!.graphics.length === 1) {
      //     this.addGraphic("destination", point);
      //
      //     this.getRoute(routeUrl);
      //   } else {
      //     this.view!.graphics.removeAll();
      //     this.addGraphic("origin", point2);
      //   }
      // }
      // eventFunction.bind(this);

      // this.view!.on("click", eventFunction);




      // =================================================================

      const newUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates"



      await this.view!.when(); // wait for map to load
      console.log("ArcGIS map loaded");
      return this.view;
    } catch (error) {
      console.error("EsriLoader: ", error);
      console.error("EsriLoader: ", error);
      throw error;
    }
  }
  addGraphic(type : any, point : any) {
    const graphic = new this._Graphic({
      symbol: {
        type: "simple-marker",
        color: (type === "origin") ? "white" : "black",
        size: "8px"
      },
      geometry: point
    });
    console.log(point)
    this.view!.graphics.add(graphic);
  }

  getRoute(routeUrl: string) {
    const routeParams = new this._RouteParameters({
      stops: new this._FeatureSet({
        features: this.view!.graphics.toArray()
      }),
      returnDirections: true
    });

    this._Route.solve(routeUrl, routeParams)
      .then(function (this: MapComponent, data : any) {
        data.routeResults.forEach(function (this: MapComponent, result : any) {
          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3
          };
          this.view!.graphics.add(result.route);
        }.bind(this));

        if (data.routeResults.length > 0) {
          const directions = document.createElement("ol");
          directions.classList.add("esri-widget");
          directions.classList.add("esri-widget--panel");
          directions.classList.add("esri-directions__scroller");
          directions.style.marginTop = "0";
          directions.style.padding = "15px 15px 15px 30px";
          const features = data.routeResults[0].directions.features;

          features.forEach(function (result : any, i : any ) {
            const direction = document.createElement("li");
            direction.innerHTML = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
            directions.appendChild(direction);
          });

          this.view!.ui.empty("top-right");
          this.view!.ui.add(directions, "top-right");
        }

      }.bind(this))
      .catch((error: any) => console.log(error));
  }

  //==========================================================================

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


  runTimer() {
    this.timeoutHandler = setTimeout(() => {
      // code to execute continuously until the view is closed
      // ...
      // this.animatePointDemo();
      this.runTimer();
    }, 200);
  }



  stopTimer() {
    if (this.timeoutHandler != null) {
      clearTimeout(this.timeoutHandler!);
      this.timeoutHandler = null;
    }

  }

  ngOnInit() {
    this.contractService.getContractById(parseInt(this.router.url.split('/')[2])).subscribe((data:any) => {
      this.contract = data.body!;

    })
    this.initializeMap().then(() => {
      this.runTimer();
    }).catch((err) => {
      console.error(err);
      alert("An error occured while loading the map");
    })
  }





}
