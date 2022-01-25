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
  pointCoords?: number[]; //[lng, lat]
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
  isConnected: boolean = false;

  subscriptionList?: Subscription;
  subscriptionObj?: Subscription;

  map?: __esri.Map;

  constructor(
    private fbs: FirebaseService,
    private contractService: ContractService,
    private router: Router,
    // private mapService: MapService

  ) {

  }
  connectFirebase() {
    if (this.isConnected) {
      return;
    }
    this.isConnected = true;
    this.fbs.connectToDatabase();
    this.subscriptionList = this.fbs!.getChangeFeedList()!.subscribe((items: ITestItem[]) => {
      console.log("got new items from list: ", items);
    });
    this.subscriptionObj = this.fbs.getChangeFeedObj()!.subscribe((stat: ITestItem[]) => {
      console.log("item updated from object: ", stat);
    });
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
      const point3 = { //Create a point
        type: "point",
        longitude:  this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][1],
        latitude:  this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][0]
      };
      this.addPoint( this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][1],
        this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][0]);
      this.addGraphic("origin", point2);
      this.addGraphic("destination", point);
      this.addGraphic("truck", point3);
      this.pointCoords = [this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][1],
        this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][0]];
      console.log(this.pointCoords)
      this.getRoute(routeUrl);

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
        color: (type === "origin") ? "white" : (type === "truck")? "red" : "black",
        size: "8px"
      },
      geometry: point
    });
    console.log(point)
    this.view!.graphics.add(graphic);
  }
  graphicsLayer?: __esri.GraphicsLayer;
  pointGraphic?: __esri.Graphic;
  addPoint(lat: number, lng: number) {
    this.graphicsLayer = new this._GraphicsLayer();
    this.map!.add(this.graphicsLayer!);
    const point = { //Create a point
      type: "point",
      longitude: lng,
      latitude: lat
    };
    const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],  // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1
      }
    };
    this.pointGraphic = new this._Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
    });
    this.graphicsLayer!.add(this.pointGraphic!);
  }


  removePoint() {
    if (this.pointGraphic != null) {
      this.graphicsLayer!.remove(this.pointGraphic);
    }
  }

  dir: number = 1;
  dir2: number = 1;
  count: number = 0;
  data :any
  animatePointDemo() {
    this.removePoint();
    let longitude =  this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][1];
      let latitude =  this.mapService.getCoords()[this.contract?.oferta?.locPlecare!][0];
    let longitude2 =  this.mapService.getCoords()[this.contract?.oferta?.locSosire!][1];
    let latitude2 =  this.mapService.getCoords()[this.contract?.oferta?.locSosire!][0];
    let diff = latitude -latitude2;
    let diff2 = longitude- longitude2;
    if(diff > 0) {
      this.dir = -1
    }
    if(diff2 < 0) {
      this.dir2 = -1;
    }
    if(this.count < 10) {
      this.pointCoords![0] += (this.dir2)*diff2/10;
      this.pointCoords![1] += (this.dir)*diff/10;
    }
    this.count += 1;

    // switch (this.dir) {
    //   case 0:
    //     this.pointCoords![1] += 0.01;
    //     break;
    //   case 1:
    //     this.pointCoords![0] += 0.02;
    //     break;
    //   case 2:
    //     this.pointCoords![1] -= 0.01;
    //     break;
    //   case 3:
    //     this.pointCoords![0] -= 0.02;
    //     break;
    // }
    //
    // this.count += 1;
    // if (this.count >= 10) {
    //   this.count = 0;
    //   this.dir += 1;
    //   if (this.dir > 3) {
    //     this.dir = 0;
    //   }
    // }

    this.addPoint(this.pointCoords![1], this.pointCoords![0]);

    const movingPoint: ITestItem = {
      name: "movingPoint",
      lat: this.pointCoords![1],
      lng: this.pointCoords![0]
    };

    this.fbs.db.object('movingPoint').set(movingPoint);
  }

  runTimer() {
    this.timeoutHandler = setTimeout(() => {
      // code to execute continuously until the view is closed
      // ...
      this.animatePointDemo();
      this.runTimer();
    }, 500);
  }


  getRoute(routeUrl: string) {
    const routeParams = new this._RouteParameters({
      stops: new this._FeatureSet({
        features: this.view!.graphics.toArray()
      }),
      returnDirections: true
    });
    console.log(typeof(routeParams.features))

    this._Route.solve(routeUrl, routeParams)
      .then(function (this: MapComponent, data : any) {
        this.data = data
        data.routeResults.forEach(function (this: MapComponent, result : any) {

          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3
          };
          this.view!.graphics.add(result.route);
          console.log(result.route.symbol)
        }.bind(this));

        if (data.routeResults.length > 0) {
          const directions = document.createElement("ol");
          directions.classList.add("esri-widget");
          directions.classList.add("esri-widget--panel");
          directions.classList.add("esri-directions__scroller");
          directions.style.marginTop = "0";
          directions.style.padding = "15px 15px 15px 30px";
          const features = data.routeResults[0].directions.features;
          // console.log(typeof(data.routeResults[0].directions.features))

          features.forEach(function (result : any, i : any ) {
            const direction = document.createElement("li");
            direction.innerHTML = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
            directions.appendChild(direction);
            // console.log(directions)
          });
          console.log(directions)
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






  stopTimer() {
    if (this.timeoutHandler != null) {
      clearTimeout(this.timeoutHandler!);
      this.timeoutHandler = null;
    }

  }

  ngOnInit() {
    this.contractService.getContractById(parseInt(this.router.url.split('/')[2])).subscribe((data:any) => {
      this.contract = data.body!;
      console.log(this.contract)
      this.initializeMap().then(() => {
        console.log(this.pointCoords)
        this.runTimer();
      }).catch((err) => {
        console.error(err);
        alert("An error occured while loading the map");
      })
    })

  }





}
