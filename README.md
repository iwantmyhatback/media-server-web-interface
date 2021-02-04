# Media Server Web Interface

I have a large collection of movies and television show files that I host on a local [Debian](https://www.debian.org) server providing streaming to all internal networked devices via SMB ([Samba](https://www.samba.org)) and DLNA ([MiniDLNA](https://help.ubuntu.com/community/MiniDLNA)). After a certain amount of file accumulation it became near impossible to browse the drives effectively through the file system as the list was massive and provided very little in terms of filtering or description.

I eventually decided that I needed a network accessible browsing alternative to be able to select files for viewing when browsing the content. I developed this single page app, which pulls file information directly from the filesystem and strips the Title and Year of realease from the file names. It then proceeds to compile information from [TMDB's API](https://developers.themoviedb.org/3/getting-started/introduction) for Posters, ratings, descriptions, and genres and [Youtube's API](https://developers.google.com/youtube/v3) for trailers to a [Postgres](https://www.postgresql.org) database and serves them up to the user.

This makes selection of files for viewing much easier seeing as the Title of a movie only goes so far when you are staring down a list of thousands of them back to back. _Note that this is not intended to play the files, only help navigate the selection and browse the titles before playing them on a SMB or DLNA enabled device_

The display scales dependent on the viewport dimentions of the device that visits the page to optimize reability across devices.

![Scaling-Example](/img/scaling-example.png)

Includes filtering of all titles by Media Type and Search strings, and movies are filterable by Movie Year and Movie Genre.
