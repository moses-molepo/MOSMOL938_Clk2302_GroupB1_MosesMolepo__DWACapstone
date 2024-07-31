Hello world ! This is 

# Podgasm

## Overview

This is a React-based podcast app that provides a platform for browsing podcasts, viewing episodes, and managing favorite episodes. The app includes a carousel for podcast cards, a detailed view of each podcast including episodes, and a list view with search and filter functionalities.

## Features

- **Podcast Carousel**: Displays podcast cards in a responsive carousel.
- **Podcast Details**: Shows detailed information about each podcast, including seasons and episodes.
- **Episode Management**: Allows users to play episodes, add/remove episodes to/from favorites, and keep track of playback position.
- **Favorite Episodes**: Provides a section to view and manage favorite episodes.
- **Search and Filter**: Includes search by title and filter by genre.

## Components

### 1. `PodcastContainer`

The main container component responsible for fetching and loading podcast data from an API.

- **Dependencies**: `Loader`, `Error`, `PodcastList`
- **Functions**: Fetches data from `https://podcast-api.netlify.app/shows`, manages loading and error states, and passes data to `PodcastList`.

### 2. `PodcastList`

Displays a list of podcasts with sorting and filtering options.

- **Dependencies**: `PodcastCarousel`
- **Functions**: Filters podcasts based on search terms and genre, sorts podcasts by title, and renders the `PodcastCarousel`.

### 3. `PodcastCarousel`

Renders a carousel of podcast cards.

- **Dependencies**: `PodcastCard`
- **Functions**: Configures the slider settings and displays a carousel of `PodcastCard` components.

### 4. `PodcastCard`

Displays detailed information about a single podcast, including description, genres, and seasons.

- **Dependencies**: `Episodes`, `FavoriteEpisodes`
- **Functions**: Manages season selection, handles favorite episodes, and displays `Episodes` and `FavoriteEpisodes` components.

### 5. `Episodes`

Displays episodes for a selected season of a podcast.

- **Dependencies**: `FavoriteEpisodes`, `Error`
- **Functions**: Fetches episode data, manages audio playback, and allows users to add/remove episodes from favorites.

### 6. `FavoriteEpisodes`

Displays a list of favorite episodes.

- **Functions**: Manages and renders a list of favorite episodes with options to remove from favorites.

### 7. `Loader`

A loading spinner displayed while data is being fetched.

### 8. `Error`

Displays an error message when data fetching fails.


## Usage

- **Podcast Carousel**: Navigate through podcasts using the carousel. Click on a podcast to view its details.
- **Podcast Details**: Select a season to view episodes. Play episodes and manage favorites.
- **Search and Filter**: Use the search bar and genre filter to find specific podcasts.

# SVG Image

<!-- Generator: Adobe Illustrator 27.5.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!-- Image by Harryarts on Freepik: https://www.freepik.com/free-vector/holding-microphone-sketch-white-background_9853350.htm#fromView=search&page=1&position=19&uuid=a8fc98ba-9eba-42bd-b3bd-d58fe52ccd97 -->


