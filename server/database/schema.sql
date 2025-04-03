CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    organizer VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration TIME,
    category VARCHAR(100) NOT NULL,
    site_web VARCHAR(255) NOT NULL
);

INSERT INTO events (name, image_url, date, location, description, organizer, price, duration, category, site_web)
VALUES 
    ('Rock Night', "https://www.rockyourlife.fr/wp-content/uploads/2023/09/comment-shabiller-pour-un-concert-rock.jpg",'2025-06-15', 'Paris', 'Une soirée rock inoubliable', 'Venez découvrir les plus grands groupes de Rock de ces dernières décénies', 69.99, '03:00:00', 'Rock', 'https://daftpunk.com/' ),
    ('Jazz Festival', "https://ema.vitry94.fr/fileadmin/ema.vitry94.fr/MEDIA/Festivitry_jazz_2023_image_coupee.png", '2025-07-10', 'Lyon', 'Les meilleurs artistes jazz sur scène' , 'Venez découvrir les plus grands groupes de Rock de ces dernières décénies', 69.99, '03:00:00', 'Rock', 'https://daftpunk.com/' ),
    ('Electro Party', "https://upload.wikimedia.org/wikipedia/commons/8/83/Daft_Punk_in_2013_2.jpg", '2025-08-05', 'Los Angeles', 'Une nuit électro avec DJ internationaux', 'Les Daft Punk seront là', 99.99, '03:00:00', 'Rock', 'https://daftpunk.com/'),
    ('ICDD', "https://www.nautiljon.com/images/people/00/35/imperial_circus_dead_decadence_75753.webp", '2025-06-01', 'Kyoto', 'Death metal', 'Imperial Circus Death Decadence', 59.99,'02:20:00', 'Rock','https://icddecadence.com/'),
    ('K-pop', "https://altselection.com/wp-content/uploads/2024/05/a9d1042130a4b172bde57863d22cb098.jpg", '2025-11-03', 'New York', 'K-pop', 'Kpop artistes', 49.99,'02:00:00', 'Rock','https://pledis.co.kr/artist/detail/seventeen/');


CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    airport VARCHAR(100) NOT NULL,
    distance_to_event INT NOT NULL, 
    transport_options TEXT NOT NULL
);

INSERT INTO cities (name, image_url, country, airport, distance_to_event, transport_options) VALUES
('Paris', 'https://wallpaper.forfun.com/fetch/b0/b01199c4a392684cb7ce105d23cbfd85.jpeg?w=1470&r=0.5625', 'France', 'Charles de Gaulle (CDG)', 10, 'Train, Taxi, Bus'),
('Lyon', 'https://www.baltana.com/files/wallpapers-29/Lyon-Tourism-Wallpaper-96261.jpg','France', 'Aéroport Lyon-Saint Exupéry (LYS)', 4, 'Tramway, Taxi, Bus'),
('Los Angeles', 'https://wallpaper.forfun.com/fetch/a7/a7b1551023001794b3c9c4d999400009.jpeg?w=1470&r=0.5625', 'États-Unis', 'Aéroport LAX', 6, 'Taxi, Bus'),
('Kyoto', 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Japan', 'Aéroport Osaka Itami', 2, 'Métro, Bus'),
('New York', 'https://monsieurmadameexplore.com/wp-content/uploads/2023/09/NYC-Top-of-The-Rock-1.jpg', 'États-Unis', 'Aéroport international John F. Kennedy', 1, 'Métro, Bus')

