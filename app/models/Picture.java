package models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Picture {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long pictureid;
	
	public String url;
}
