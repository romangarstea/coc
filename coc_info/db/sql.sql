
CREATE TABLE coc_registration_request
(
	id_registration_request INT UNSIGNED AUTO_INCREMENT,
	tag VARCHAR(15) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY(id_registration_request)
);

CREATE	TABLE coc_users
(
	id_user INT UNSIGNED AUTO_INCREMENT,
	name VARCHAR(20),
	sity VARCHAR(20),
	country VARCHAR(20),
	age_user DATE,
	age_clan DATE,
  gmt INT,
  password VARCHAR(255) NOT NULL,
  acces VARCHAR(20) NOT NULL,
	PRIMARY KEY(id_user)
);

CREATE	TABLE coc_users_coc
(
	id_users_coc INT UNSIGNED AUTO_INCREMENT,
	tag VARCHAR(30) NOT NULL,
	id_user_ref INT UNSIGNED,
	PRIMARY KEY(id_users_coc),
	FOREIGN KEY(id_user_ref) REFERENCES coc_users(id_user)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO `coc_users` (`id_user`, `name`, `sity`, `country`, `age_user`, `age_clan`, `gmt`, `password`, `acces`) VALUES
(1, 'Roman', 'Montreal', 'Canada', '1979-04-01', '2016-11-09', -5, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed'),
(2, 'David', 'New York City', 'United States', '1972-01-01', '2016-08-18', -5, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed'),
(3, 'Constantin', 'Moskow', 'Russia', '1974-01-01', '2016-08-07', 3, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed'),
(4, 'Alecsandr', 'Vladimir', 'Russia', '1974-01-01', '2016-08-18', 3, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed'),
(5, 'Bernard', 'Quebec', 'Canada', '1978-01-01', '2016-04-14', -5, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed'),
(6, 'Christian', 'Laval', 'Canada', '1976-01-01', '2016-05-14', -5, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed'),
(7, 'Lucien', 'Gatineau', 'Canada', '1980-01-01', '2016-03-14', -5, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed'),
(8, 'Paul', 'Saguenay', 'Canada', '1982-01-01', '2016-07-14', -5, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed');



INSERT INTO `coc_users_coc` (`id_users_coc`, `tag`, `id_user_ref`) VALUES
	(1, '89R8RY0JG', 1),
	(2, 'CC8GGPUR', 2),
	(3, 'QLYU9R89', 2),
	(4, '2LRL28VQY', 3),
	(5, '2CLQ0LGRY', 4),
	(6, 'RJPGVUJ2', 5),
	(7, '8CP2UCV2', 6),
	(8, '8UV2VG2V', 7),
  (9, 'YUJ0RJCL', 8);














