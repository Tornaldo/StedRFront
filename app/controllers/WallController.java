package controllers;

import java.util.List;

import models.Wall;
import play.*;
import play.libs.Json;
import play.mvc.*;

public class WallController extends Controller {
	
	public static Result listWallsInJson() {
		List<Wall> walls = Wall.findAll();
		return ok(Json.toJson(walls));
	}
}
