package models;

import java.util.List;
import javax.persistence.*;
import play.db.ebean.*;
import com.avaje.ebean.*;

@Entity
public class Wall extends Model {
	@Id
	public Long id;
	public String name;
	
	public static Model.Finder<Long, Wall> find = new Model.Finder<>(Long.class, Wall.class);
	
	public static List<Wall> findAll() {
		return find.findList();
	}
}
