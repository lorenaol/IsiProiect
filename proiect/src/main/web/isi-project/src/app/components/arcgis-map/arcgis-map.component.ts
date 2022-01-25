import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {setDefaultOptions, loadModules} from 'esri-loader';
import {Observable, Subscription} from "rxjs";
import {FirebaseService, ITestItem} from "../../database/firebase";
import {MapService} from "@app/services/map.service";
import {OfferService} from "@app/services/offer.service";
import {CamionService} from "@app/services/camion.service";
import {Router} from "@angular/router";
import {Camion} from "@app/entities/camion";
import {Offer} from "@app/entities/offer";


@Component({
  selector: 'app-arcgis-map',
  templateUrl: './arcgis-map.component.html',
  styleUrls: ['./arcgis-map.component.css']
})
export class ArcgisMapComponent implements OnInit{

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
  trucks? :Camion[];

  map?: __esri.Map;
  pointGraphic?: __esri.Graphic;
  graphicsLayer?: __esri.GraphicsLayer;

  // pointCoords: number[] = [-118.73682450024377, 34.07817583063242]; //[lng, lat]
  dir: number = 0;
  count: number = 0;

  subscriptionList?: Subscription;
  subscriptionObj?: Subscription;

  isConnected: boolean = false;

  item?: Observable<any>;
  mapService = new MapService();
  constructor(
    private fbs: FirebaseService,
    private camionService: CamionService,
    private router: Router,
    private offerService: OfferService
    // private fbs: FirebaseMockService
  ) {
  }

  // connectFirebase() {
  //   if (this.isConnected) {
  //     return;
  //   }
  //   this.isConnected = true;
  //   this.fbs.connectToDatabase();
  //   this.subscriptionList = this.fbs.getChangeFeedList()?.subscribe((items: ITestItem[]) => {
  //     console.log("got new items from list: ", items);
  //   });
  //   this.subscriptionObj = this.fbs.getChangeFeedObj()?.subscribe((stat: ITestItem[]) => {
  //     console.log("item updated from object: ", stat);
  //   });
  // }
  //
  // addTestItem() {
  //   this.fbs.addTestItem();
  // }
  //
  // disconnectFirebase() {
  //   if (this.subscriptionList != null) {
  //     this.subscriptionList.unsubscribe();
  //   }
  //   if (this.subscriptionObj != null) {
  //     this.subscriptionObj.unsubscribe();
  //   }
  // }

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

      this.addFeatureLayers();
     // this.addPoint(this.pointCoords[1], this.pointCoords[0]);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl?.nativeElement,
        center: [	24.53, 	44.79],
        zoom: 6,
        map: this.map
      };

      this.view = new MapView(mapViewProperties);

      // =================================================================
      const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
      this.camionService.getTrucksByUserId(JSON.parse(localStorage.getItem('user')!).id).subscribe((data:any) => {
        this.trucks = data.body;
        console.log(data.body)
        this.view!.graphics.removeAll();
        for(let truck of this.trucks!) {
          const point = { //Create a point
            type: "point",
            longitude:  this.mapService.getCoords()[truck.locatie!][1],
            latitude:  this.mapService.getCoords()[truck.locatie!][0]
          };
          if(truck.status === "preluat") {
            this.addGraphic("preluat", point);
          } else {
            this.addGraphic("destination", point);
          }
        }

      })

      this.view!.popup.autoOpenEnabled = false;
      this.view!.on("click", (event) => {
        let tr : Camion;
        let off : Offer;
        for(let truck of this.trucks!) {
          let longitude =  this.mapService.getCoords()[truck.locatie!][1];
          let latitude =  this.mapService.getCoords()[truck.locatie!][0];
          if((longitude <= event.mapPoint.longitude + 0.5 || longitude >= event.mapPoint.longitude - 0.5)&&
            (latitude <= event.mapPoint.latitude + 0.5 || latitude >= event.mapPoint.latitude - 0.5) ){
            tr = truck;
            this.offerService.getOffer().subscribe((data: any)=>{
              console.log(data.body)
              if(data.body) {
                for(let offer of data.body) {
                  if(offer.camion.id == tr.id) {
                    off = offer;
                  }
                }
              }
              let msg : string;
              if(!off) {
                msg = 'Nu a fost publicata nici o oferta pentru acest camion'
              } else {
                msg = "De la : " + off!.locPlecare + " La : "+ off!.locSosire + ". Data plecare : " +
                  new Date(off!.dataPlecare!).getDate().toString()
                  + '-' +
                  new Date(off!.dataPlecare!).getMonth() + '-' +
                  new Date(off!.dataPlecare!).getFullYear()
                + "; Data sosire:" + new Date(off!.dataSosire!).getDate().toString()
                  + '-' +
                  new Date(off!.dataSosire!).getMonth() + '-' +
                  new Date(off!.dataSosire!).getFullYear()
              }
              this.view!.popup.open({
                // Set the popup
                location: event.mapPoint,  // location of the click on the view
                title: "Id Camion : " + tr!.id,  // title displayed in the popup
                content: msg
              });
            })
          }
        }


      });
//       “De la: AAA” si “La: BBB”
// unde AAA este locul plecării și BBB este locul sosirii (De ex: “De la Giurgiu”, “La
//       Oradea”). Se vor afișa și două câmpuri de tip dată calendaristică, “Data plecare: ” si
// “Data sosire:

      // const eventFunction = (event : any) => {
      //   if (this.view!.graphics.length === 0) {
      //     //this.addGraphic("origin", event.mapPoint);
      //   } else if (this.view!.graphics.length === 1) {
      //    // this.addGraphic("destination", event.mapPoint);
      //
      //     // this.getRoute(routeUrl);
      //   } else {
      //     this.view!.graphics.removeAll();
      //  //   this.addGraphic("origin", event.mapPoint);
      //   }
      // }
      // eventFunction.bind(this);
      //
      // this.view!.on("click", eventFunction);

      // =================================================================

      // Fires `pointer-move` event when user clicks on "Shift"
      // key and moves the pointer on the view.
      // this.view!.on('pointer-move', ["Shift"], (event : any) => {
      //   let point = this.view!.toMap({x: event.x, y: event.y});
      //   console.log("map moved: ", point.longitude, point.latitude);
      // });

      await this.view!.when(); // wait for map to load
      console.log("ArcGIS map loaded");
      return this.view;
    } catch (error) {
      console.error("EsriLoader: ", error);
      console.error("EsriLoader: ", error);
      throw error;
    }
  }

  // ==========================================================================
  addGraphic(type : any, point : any) {
    const graphic = new this._Graphic({
      symbol: {
        type: "simple-marker",
        color: (type === "preluat") ? "red" : "green",
        size: "8px"
      },
      geometry: point
    });

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
      .then(function (this: ArcgisMapComponent, data : any) {
        data.routeResults.forEach(function (this: ArcgisMapComponent, result : any) {
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

  // addPoint(lat: number, lng: number) {
  //   this.graphicsLayer = new this._GraphicsLayer();
  //   this.map!.add(this.graphicsLayer!);
  //   const point = { //Create a point
  //     type: "point",
  //     longitude: lng,
  //     latitude: lat
  //   };
  //   const simpleMarkerSymbol = {
  //     type: "simple-marker",
  //     color: [226, 119, 40],  // Orange
  //     outline: {
  //       color: [255, 255, 255], // White
  //       width: 1
  //     }
  //   };
  //   this.pointGraphic = new this._Graphic({
  //     geometry: point,
  //     symbol: simpleMarkerSymbol
  //   });
  //   this.graphicsLayer!.add(this.pointGraphic!);
  // }

  // removePoint() {
  //   if (this.pointGraphic != null) {
  //     this.graphicsLayer!.remove(this.pointGraphic);
  //   }
  // }

  runTimer() {
    this.timeoutHandler = setTimeout(() => {
      // code to execute continuously until the view is closed
      // ...
      // this.animatePointDemo();
      this.runTimer();
    }, 200);
  }

  // animatePointDemo() {
  //   this.removePoint();
  //   switch (this.dir) {
  //     case 0:
  //       this.pointCoords[1] += 0.01;
  //       break;
  //     case 1:
  //       this.pointCoords[0] += 0.02;
  //       break;
  //     case 2:
  //       this.pointCoords[1] -= 0.01;
  //       break;
  //     case 3:
  //       this.pointCoords[0] -= 0.02;
  //       break;
  //   }
  //
  //   this.count += 1;
  //   if (this.count >= 10) {
  //     this.count = 0;
  //     this.dir += 1;
  //     if (this.dir > 3) {
  //       this.dir = 0;
  //     }
  //   }
  //
  //   //this.addPoint(this.pointCoords[1], this.pointCoords[0]);
  //
  //   const movingPoint: ITestItem = {
  //     name: "movingPoint",
  //     lat: this.pointCoords[1],
  //     lng: this.pointCoords[0]
  //   };
  //
  //   this.fbs.db.object('movingPoint').set(movingPoint);
  // }

  stopTimer() {
    if (this.timeoutHandler != null) {
      clearTimeout(this.timeoutHandler!);
      this.timeoutHandler = null;
    }

  }

  ngOnInit() {
    this.initializeMap().then(() => {
      this.runTimer();
    }).catch((err) => {
      console.error(err);
      alert("An error occured while loading the map");
    })
  }

  // ngOnDestroy() {
  //
  //   this.stopTimer();
  //   this.disconnectFirebase();
  // }

}
