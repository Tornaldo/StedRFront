package models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Picture {
	@Id
	public Long id;
	
	public String url;
}
