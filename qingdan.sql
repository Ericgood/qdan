SET NAMES UTF8;
DROP DATABASE IF EXISTS qingdan;
CREATE DATABASE qingdan CHARSET=UTF8;
USE qingdan;

/**用户信息表**/
CREATE TABLE t_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32)
);
INSERT INTO t_login VALUES
(null, 'qiangdong', '123456'),
(null, 'naicha', '456789');

CREATE TABLE t_user(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    pic VARCHAR(32),
    id INT /**注册表中的id**/
);
INSERT INTO t_user VALUES
(null, 'img/default.png', '1'),
(null, 'img/default01.jpg', '2');

CREATE TABLE t_news(
   nid INT PRIMARY KEY AUTO_INCREMENT,
   title VARCHAR(200),
   img VARCHAR(64),
   detail VARCHAR(2048),
   releaseTime BIGINT,
   newsType INT,
   /**1极客科技2生活方式3文艺范儿4设计艺术5吃喝玩乐6喜闻乐见7其他**/
   uid INT
);
INSERT INTO t_news VALUES
(null,'为什么猫通统治了互联网', 'img/header_image31.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1214567890123','1','1'),
(null,'为什么猫通统治了互联网', 'img/header_image37.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1224567890123','2','2'),
(null,'为什么猫通统治了互联网', 'img/header_image69.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1234567890123','3','1'),
(null,'为什么猫通统治了互联网', 'img/header_image79.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1244567890123','4','2'),
(null,'为什么猫通统治了互联网', 'img/header_image97.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1254567890123','5','1'),
(null,'为什么猫通统治了互联网', 'img/header_image100.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1264567890123','6','2'),
(null,'为什么猫通统治了互联网', 'img/header_image31.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1214567890123','6','1'),
(null,'为什么猫通统治了互联网', 'img/header_image37.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1224567890123','5','2'),
(null,'为什么猫通统治了互联网', 'img/header_image69.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1234567890123','4','1'),
(null,'为什么猫通统治了互联网', 'img/header_image79.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1244567890123','3','2'),
(null,'为什么猫通统治了互联网', 'img/header_image97.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1254567890123','2','1'),
(null,'为什么猫通统治了互联网', 'img/header_image100.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1264567890123','1','2'),
(null,'为什么猫通统治了互联网', 'img/header_image79.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1244567890123','7','2'),
(null,'为什么猫通统治了互联网', 'img/header_image97.jpg','1.人人都是产品经理，2.互联网运营学堂，3.鸟哥标记，4.姑婆那些事，5.91运营网','1254567890123','7','1');