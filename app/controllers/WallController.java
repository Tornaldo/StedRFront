package controllers;
import java.util.List;

import models.WallModel;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class WallController extends Controller {
	
	public static Result listWallsInJson() {
		List<WallModel> walls = WallModel.findAll();
		return ok(Json.toJson(walls));
	}
}
