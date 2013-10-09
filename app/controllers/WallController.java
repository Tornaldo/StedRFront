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
	
	public static Result listWallsForLocation(Double latitude, Double longitude) {
		System.out.println("lat: " + latitude + " long: " + longitude);
		
		List<WallModel> walls = WallModel.findAll();
		return ok(Json.toJson(walls));
	}
	
	
}
