package models;

import java.util.List;
import javax.persistence.*;
import play.db.ebean.*;
import com.avaje.ebean.*;

@Entity
public class WallModel extends Model {
	@Id
	public Long id;
	public String name;
	
	public static Model.Finder<Long, WallModel> find = new Model.Finder<>(Long.class, WallModel.class);
	
	public static List<WallModel> findAll() {
		return find.findList();
	}
}
