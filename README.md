# Media Server Web Interface

## Summary
I have a large collection of movies and television show files that I host on a local [Debian](https://www.debian.org) server providing streaming to all internal networked devices via SMB ([Samba](https://www.samba.org)) and DLNA ([MiniDLNA](https://help.ubuntu.com/community/MiniDLNA)). After a certain amount of file accumulation it became near impossible to browse the drives effectively through the file system as the list was massive and provided very little in terms of filtering or information.

I eventually decided that I needed a network accessible browsing alternative to be able to select files for viewing when browsing the content. I developed this single page app using [Javascript](https://www.javascript.com), [React](https://reactjs.org), and [Node](https://nodejs.org/en/) to remedy the situation. The goal of the application is to be accessable for the user(s) on a local network by cellphone, tablet, or laptop to aid in the selection of media to stream from the server to their streaming device. The application provides this assistance by compiling posters, descriptions, and trailers for each title in a filterable and sortable format for easy browsing. The application also offers the user(s) a way to track which titles have already been watched to further narrow browing selection as desired.

## Functionality
The app pulls the media's information directly from the file system and strips the Title and Year of release from the file names. Files must be STRICTLY named and contained in the following format for for the ETL process to work correctly

- "Movies"(Directory)/"Movie Title [YYYY]"(Directory)/"Movie Title [YYYY]".mp4/avi/mkv(File)
- "TV"(Directory)/"Show Title"(Directory)/"Season ##"(Directory)/Episode Title.mp4/avi/mkv(File)

The application will also accomodate subtitle files contained in the directory with each media file without causing ETL problems, and ideally down the line I will implemnt a display of which titles have subtitle files included

The app then proceeds to compile information from [TMDB's API](https://developers.themoviedb.org/3/getting-started/introduction) for Posters, ratings, descriptions, and genres and [Youtube's API](https://developers.google.com/youtube/v3) for trailers to a [Postgres](https://www.postgresql.org) database and serves them up to the user in a browsable and filterable format.

![expanded-info-example](/img/expanded-information-example.png)

This makes selection of files for viewing much easier seeing as the Title of a movie only goes so far when you are staring down a list of thousands of them back to back. _Note that this application is not intended to play the files, only help navigate the collection and browse the titles before playing them on a SMB or DLNA enabled streaming device_

## Scaling
The display scales dependent on the viewport dimentions of the device that visits the page to optimize reability across devices.

![Scaling-Example](/img/scaling-example.png)

## Filtering and Sorting
The application includes filtering of all titles by Media Type, Title search strings, and Genres and movies are additionally filterable by Movie Year and the Movie "Seen" status the owner has set for each title. The Sort order of movies is also selectable allowing the ability to sort by Title, Year, or Rating. All sorts and filters have been designed to stack so they can be used in conjunction to narrow the browsing selection to the user's specifications

![filtering-example](/img/filtering-example.gif)

## Description Correction
Sometimes the application's first guess as to a movie description can be incorrect, this happens for films with vague or common names, inaccurate year listings, films with sequels, or films that have the same title as another film. So there is a button in the expanded film description called "Incorrect title information!" which allows the user to examine all results for the title they have selected and browse for the correct description to overwrite the current (incorrect) one.

## Other Features
- The ability to mark movies as watched so that the user or their guests can keep track of what films have already been viewed by the owner.
- Total Movie and Show Counts
- Customizable user name and service name (see the config file)
