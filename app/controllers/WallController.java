package controllers;
import java.util.List;

import models.WallModel;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class WallController extends Controller {
	
	public static Result listAllWalls() {
		List<WallModel> walls = WallModel.findAll();
		return ok(Json.toJson(walls));
	}
	
	public static Result listWallsForLocation(Double startLatitude, Double startLongitude, Double stopLatitude, Double stopLongitude) {
		System.out.println("lat: " + startLatitude + " long: " + startLongitude);
		
		List<WallModel> walls = WallModel.findAll();
		return ok(Json.toJson(walls));
	}
	
	
}
