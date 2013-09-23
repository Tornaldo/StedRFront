package controllers;

import java.util.List;

import models.WallModel;
import play.*;
import play.libs.Json;
import play.mvc.*;

public class WallController extends Controller {
	
	public static Result listWallsInJson() {
		List<WallModel> walls = WallModel.findAll();
		return ok(Json.toJson(walls));
	}
}
