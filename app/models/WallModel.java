package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import play.db.ebean.Model;

@Entity
@Table(name="wall")
public class WallModel extends Model {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long wallId;
	
	public Double latitude;
	
	public Double longitude;
	
	public String name;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public List<Picture> pictures;
	
	public static Model.Finder<Long, WallModel> find = new Model.Finder<>(Long.class, WallModel.class);
	
	public static List<WallModel> findAll() {
		return find.findList();
	}
}
