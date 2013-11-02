# Requirements changes

During development of this project, we dealt with constant changes in requirements from the customer side. This certainly slowed down the development as we needed to rework some of the features as well as implemented some code that was not used in the the final product.


## Original requirements

The first draft of requirements was based on information we got from the project description supplied by the customer and from our first meeting.

Originally, the goal of the project was to develop a prototype backend server and a frontend application for one target device (tablet was suggested for this purpose).

The functional requirements as described in the document handed in as a project description by customer:

* Managing virtual walls: creation & deletion; retrieval according to location, popularity, topics and other metadata (e.g. author)
* Managing stories: adding stories through a click on a specific place on the wall, filtering stories according to popularity, topics and other metadata (e.g. duration)
* Social interaction: sharing walls (possibly stories) for editing, adding comments to walls and stories.
* Promotion through social networks: sharing walls and stories through social networks (e.g. Facebook, Twitter)

From this description, we carried out first draft of our requirements document. The sections below state functional (grouped by topic) and non-functinal requirements from this iteration.

### Functional: Users
	
* F1.1 System shall let users to register an account within the system.
* F1.2 System shall enable group management.
* F1.2.1 System shall let registered users to create a group.
* F1.2.2 System shall let the group owner add users to group.
* F1.2.3 System shall let  the group owner remove users from group.

### Functional: Walls

* F2.1 System shall enable management of virtual walls
* F2.1.1 System shall let registered users create a virtual wall
* F2.1.2 System shall let owner delete a virtual wall
* F2.2 System shall let users retrieve and view walls
* F2.2.1 System shall let users to filter walls by popularity
* F2.2.2 System shall let users to filter walls by topics (user-defined tags)
* F2.2.3 System shall get auto-fill suggestions when filtering upon topics (user defined tags)
* F2.2.4 System shall let users to filter walls by metadata
* F2.3 System shall enable social interaction upon walls
* F2.3.1 System shall let users edit walls collaboratively in groups
* F2.3.2 System shall let registered users comment on walls
* F2.4 System shall let users share wall over social networks (facebook, twitter).

### Functional: Stories

* F3.1 System shall enable management of stories on virtual walls
* F3.1.1 System shall let registered users add story on a wall by clicking on a desired place on the wall
* F3.1.2 System shall enable the stories to contain text, hyperlinks, video, pictures, audio
* F3.2 System shall let users retrieve and view stories
* F3.2.1 System shall let users to filter stories by popularity
* F3.2.2 System shall let users to filter stories by topics (user defined tags)
* F3.2.3 System shall get auto-fill suggestions when filtering upon topics (user defined tags)
* F3.2.4 System shall let users to filter stories by metadata (author, media duration)
* F3.3 System shall enable social interaction upon stories
* F3.3.1 System shall let users comment on stories
* F3.4 System shall let users share stories over social networks (facebook, twitter).

### Non-functional

* NF1 Application shall enable offline work (limited).
* NF2 Application shall be developed for one target mobile device (tablet).


## Changes - Iteration 1

After the first few meetings with the customer, some necessary changes were carried out.

Customer decided that offline mode does not need to be implemented as this is a prototype of the application and it should be simple, rapidly developed and used rather as a proof of concept than production-ready.

Customer also requested adding two functional requirements concerning walls:

* F2.1.3 System shall enable owner to add contributors to wall
* F2.2.4 System shall get auto-fill suggestions when filtering upon topics (user defined tags)
* F2.2.5 System shall show user a list of walls that feature his stories

## Changes - Iteration 2

Many issues raised when analysing the requirements concerning users and groups, the owner relationships between users, groups and walls.

The original concept proposed was proven corrupt and inconsistent. Several requirements were dropped for this reason:

* F1.2 System shall enable group management.
* F1.2.1 System shall let registered users to create a group.
* F1.2.2 System shall let the group owner add users to group.
* F1.2.3 System shall let the group owner remove users from group.
* F2.3.1 System shall let users edit walls collaboratively in groups

Also, so called *topics* are now simply refered to as *tags* instead. These were mentioned in: 
* F2.2.2 System shall let users to filter walls by ...
* F2.2.3 System shall get auto-fill suggestions when filtering upon topics (user defined tags)

Another requirement was dropped as it was a duplicate of another.
* System shall enable social interaction upon walls

Requirement F3.1.1 was rewritten from *System shall let registered users add story on a wall by clicking on a desired place on the wall* to more general *System shall let registered users add story to a location* as a particular mechanism of adding walls is a concern of design and implementation and proven to be a subject of change.


## Changes - Iteration 3

In an e-mail from customer from October 9, 2013, many crucial changes were requested.

Customer came up with the idea, that there is not to be any internal database for this system and it should merely retrieve data from other systems' APIs, such as *Digitalt Fortalt*, *Flickr*.

As system does not store any entities in its own database, it is not its concern to be in charge of access control. The concept of users and owner relationships is therefore abandoned and the rest of functional requirements concerning those are dropped:

* F1.1 System shall let users to register an account within the system.
* F2.1.2   & System shall let owner delete a virtual wall
* F2.1.3   & System shall enable owner to add contributors to wall (their stories for this location shall appear on the wall)


Another suggestion was that stories shall be retrieved from *Digitalt Fortalt* or *Storify* or similar service. We therefore cannot offer filtering upon attributes that are not present in the API of the service we use.

* F2.2.1 System shall let users to filter walls by popularity
* F3.2.1 System shall let users to filter stories by popularity.


Also, we are not able to get list of tags in the system a priori to getting the stories.

* F3.2.3 System shall get auto-fill suggestions when filtering upon topics (user defined tags)


Not storing stories in own database also means user is not going to create or edit stories inside our application. The application shall only inform the user how to create the story, but the users must do this themself. Thus we dropped some other requirements:

* F3.1.1 System shall let registered users add story to a location

As we are not able to store the comments in our database, it was suggested to use *Twitter* to let users comment on stories and drop commenting on walls compately.


The missing database brought up the problem where should we get the walls from. For this purpose *Flickr* was suggested. This also means we do not store the walls anymore, which implies dropping other requirements:

* F2.1     & System shall enable management of virtual walls
* F2.1.1   & System shall let registered users create a virtual wall


Another request was that the project name shall change from *Virtual Wall* to *StedR* (norwegian for *places*, colloquially). The reason is uncertainty of most people about what the term actually means.

>  Jeg har merket at folk ikke forstår begrep Virtual Wall. Hava synes dere om StedR? - Jacqueline Floch

This change as well makes us call *walls* with their new name *places* instead. The rest of report is following this.


## Changes - Iteration 4

In the following two weeks, the requirements were finalized and settled.

Additional feature of showing photos for tags on *Instagram* was requested.

* 4.1 System shall show images tagged with the tag of the particular place.

It was agreed that we shall use *Flickr* group called [StedR](http://www.flickr.com/groups/2297124@N25/) as a source of the *places*. Each photo added to this group shall appear as a *place* in our application on a place where it was geo-tagged on *Flickr*.