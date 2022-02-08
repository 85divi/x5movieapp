class Film {
    constructor(title, year){
        this.title = title;
        this.year = year;
    }
    describe() {
        return`${this.title} is from ${this.year}`;
    }
}

class Genre {
    constructor(name) {
        this.name = name;        
        this.films = [];
    }
    
    addNewFilm(film) {
        if (film instanceof Film) {
          this.films.push(film)
        } else {
            throw new Error(`You can only add a film: ${film}`);
        }
    }

    describe() {
        return `${this.name} is from ${this.films.length} films.`;
    }
}

class Menu {
    constructor() {
        this.genres = [];
        this.selectedGenre = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
       
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.addGenre();
                    break;
                case '2':
                    this.viewGenre();
                    break;
                case '3':
                    this.deleteGenre();
                    break;
            
                default:
                    selection = 0;    
            }
            selection = this.showMainMenuOptions();
        }
        alert('FIN');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Add Genre
        2) View Genre
        3) Delete Genre
        `);
    }

    showGenreMenuOptions(filmInfo) {
        return prompt(`
        0) Back
        1) Add Film
        2) Delete Film
        - - - - - - - - - -
        ${filmInfo} 
        `);

    }

    
    

    addGenre() {
        let name = prompt('Enter Genre of film:');
        this.genres.push(new Genre(name));
    }

    viewGenre() {
        let index = prompt('Select a Genre to view:');
        if (index > -1 && index < this.genres.length) {
            this.selectedGenre = this.genres[index];
            let description = 'Genre Type :' + this.selectedGenre.name + '\n';

            for (let i = 0; i < this.selectedGenre.films.length; i++) {
                description += '       ' + this.selectedGenre.films[i].title + ' - ' + this.selectedGenre.films[i].year + '\n';                
            }

            let selection = this.showGenreMenuOptions(description);
            switch (selection) {
                case '1':
                    this.addFilm();
                    break;
                case '2':
                    this.deleteFilm();

            }
        }
    }
    deleteGenre() {
        let index = prompt(`Enter Genre to Delete`);
        if (index > -1 && index < this.genres.length) {
            this.genres.splice(index, 1);
        }


    }
    addFilm() {
        let title = prompt(`Enter title of new Film:`);
        let year = prompt('Enter Year of film:');
        this.selectedGenre.films.push(new Film(title, year));
    }

    deleteFilm() {
        let index = prompt('Select number of Film to delete:');
        if (index > -1 && index < this.selectedGenre.films.length) {
            this.selectedGenre.films.splice(index, 1);
        }
}

}
let menu = new Menu();
menu.start();