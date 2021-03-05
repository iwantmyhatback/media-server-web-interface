# Media Server Web Interface

## Summary
I have a large collection of movies and television show files that I host on a local [Debian](https://www.debian.org) server providing streaming to all internal networked devices via SMB ([Samba](https://www.samba.org)) and DLNA ([MiniDLNA](https://help.ubuntu.com/community/MiniDLNA)). After a certain amount of file accumulation it became near impossible to browse the drives effectively through the file system as the list was massive and provided very little in terms of filtering or description.

I eventually decided that I needed a network accessible browsing alternative to be able to select files for viewing when browsing the content. I developed this single page app using [Javascript](https://www.javascript.com), [React](https://reactjs.org), and [Node](https://nodejs.org/en/).

## Functionality
The app pulls the media's information directly from the file system and strips the Title and Year of release from the file names. Files must be STRICTLY named and contained in the following format for for the ETL process to work

- "Movies"(Directory)/"Movie Title [YYYY]"(Directory)/"Movie Title [YYYY]".mp4/avi/mkv(File)
- "TV"(Directory)/"Show Title"(Directory)/"Season ##"/Episode Title.mp4/avi/mkv(File)

The app then proceeds to compile information from [TMDB's API](https://developers.themoviedb.org/3/getting-started/introduction) for Posters, ratings, descriptions, and genres and [Youtube's API](https://developers.google.com/youtube/v3) for trailers to a [Postgres](https://www.postgresql.org) database and serves them up to the user in a browsable and filterable format.

![expanded-info-example](/img/expanded-information-example.png)

This makes selection of files for viewing much easier seeing as the Title of a movie only goes so far when you are staring down a list of thousands of them back to back. _Note that this is not intended to play the files, only help navigate the selection and browse the titles before playing them on a SMB or DLNA enabled device_

## Scaling
The display scales dependent on the viewport dimentions of the device that visits the page to optimize reability across devices.

![Scaling-Example](/img/scaling-example.png)

## Filtering
Includes stackable filtering of all titles by Media Type, Search strings, and Genres and movies are additionally filterable by Movie Year and the Movie "Seen" status the owner has set for each title. The Sort order of movies is also selectable allowing the ability to soryt by Title, Year, or Rating

![filtering-example](/img/filtering-example.gif)

## Description Correction
Sometimes the application's first guess as to a movie description can be incorrect, this happens for films with vuage or common names, inaccurate year listings, films with sequels, or films that have the same title as another film. So there is a button in the expanded film description called "Incorrect title information!" which allows the user to examine all results for the title they have selected and browse for the correct description to overwrite the current (incorrect) one.

## Other Features
- The ability to mark movies as watched so that the user or their guests can keep track of what films have already been viewed by the owner.
- Total Movie and Show Counts
- Customizable user name and service name (see the config file)
