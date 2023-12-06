CREATE DATABASE  IF NOT EXISTS `byte_recipes_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `byte_recipes_db`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: byte_db
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `comment` mediumtext NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `recipe_id_idx` (`recipe_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'Bryce','Richey','Such a good recipe, I had to share it!','2023-11-10 20:58:40'),(2,3,1,'Bryce','Richey','Delicious!','2023-11-10 21:01:14'),(3,6,1,'Bryce','Richey','I thought it was good but the tofu bacon had a weird texture, but I\'d make it again.','2023-11-10 21:02:29'),(4,7,1,'Bryce','Richey','Not a fan of the aftertaste the hemp gave.','2023-11-10 21:03:43'),(5,8,1,'Bryce','Richey','I make these all the time, my partner and I love them!','2023-11-10 21:04:16'),(6,10,1,'Bryce','Richey','So sweet and sour, just perfect.','2023-11-10 21:04:43'),(7,64,1,'Bryce','Richey','I enjoyed making this and it tasted very authentic.','2023-11-10 21:05:30'),(8,66,1,'Bryce','Richey','Tastes AMAZING! I don\'t know if I\'d make it again though since it requires a lost of ingredients for a tea. ','2023-11-10 21:07:11'),(9,67,1,'Bryce','Richey','The dough was a little liquid when cooking and turned multiple cookies into one large one lol.','2023-11-10 21:08:40'),(10,1,2,'Logan','Tomlin','AMAZING!','2023-11-10 21:55:27'),(11,5,2,'Logan','Tomlin','A little to sweet for my liking! I\'d say less maple syrup next time.','2023-11-10 21:57:38'),(12,8,2,'Logan','Tomlin','These are to die for, so moist and so tasty.','2023-11-10 21:58:15'),(13,65,2,'Logan','Tomlin','I make this all the time for family get togethers!','2023-11-10 21:59:04'),(14,67,2,'Logan','Tomlin','I made it with extra peanut butter and it turned out great!','2023-11-10 21:59:43'),(15,2,3,'Jen','Taylor','The oat came out the perfect texture the next morning!','2023-11-10 22:00:49'),(16,7,3,'Jen','Taylor','I agree with Bryce, the hemp seed were a little overpowering.','2023-11-10 22:02:08'),(17,8,3,'Jen','Taylor','I think there is a little too much butter in them but, besides that they were really good.','2023-11-10 22:03:09'),(18,10,3,'Jen','Taylor','So satisfying for my sweet tooth!','2023-11-10 22:03:48'),(19,64,3,'Jen','Taylor','Salty just like miso soup should be!','2023-11-10 22:04:28'),(20,66,3,'Jen','Taylor','Loved it!','2023-11-10 22:05:07'),(21,67,3,'Jen','Taylor','The flavor was great and simple, might spice it up next time.','2023-11-10 22:05:48');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ingredient` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ingredients_UNIQUE` (`ingredient`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (19,''),(58,' olive oil'),(22,'all-purpose flour'),(9,'almond milk'),(73,'apple cider vinegar'),(68,'apple sauce'),(79,'apples'),(93,'asd'),(20,'baking powder'),(21,'baking soda'),(81,'bananas'),(95,'black beans'),(119,'black peppercorn'),(114,'black tea bags'),(41,'blueberries'),(102,'bok choy leaves'),(64,'brown sugar'),(28,'can black beans'),(46,'can light coconut milk'),(115,'cardamom pods'),(56,'cauliflower'),(87,'cherries'),(13,'chia seeds'),(6,'chickpea flour'),(54,'chives'),(124,'chocolate chips'),(5,'cinnamon'),(116,'cinnamon sticks'),(32,'cloves garlic'),(109,'cloves garlic minced'),(10,'coconut milk'),(8,'coconut oil'),(78,'cornstarch'),(35,'cumin'),(26,'eggs'),(76,'extra firm silken tofu'),(15,'fresh blueberries'),(23,'fresh fruit'),(100,'fresh ginger'),(59,'fresh lemon juice'),(94,'granular sugar'),(24,'granulated sugar'),(85,'grapes'),(37,'green chilies'),(105,'green onions'),(34,'green pepper'),(67,'ground cardamom'),(44,'ground cinnamon'),(66,'ground cloves'),(98,'ground colves'),(70,'ground ginger'),(113,'ground pepper'),(104,'handful of spinach'),(55,'hemp hearts'),(90,'honey'),(111,'italian seasoning'),(29,'juice of lime'),(75,'lemon juice'),(74,'lemon zest'),(97,'light coconut milk'),(3,'loaf french bread'),(69,'loose-leaf black tea'),(12,'maple syrup'),(108,'marinara sauce'),(110,'minced basil'),(121,'non dairy-milk'),(39,'non-dairy cheese'),(51,'non-dairy milk'),(45,'nutmeg'),(27,'oil'),(122,'old fashioned oats'),(49,'olive oil'),(38,'optional pepper'),(30,'optional salt'),(125,'peanut butter'),(83,'pears'),(106,'penne pasta'),(14,'pinch of salt'),(7,'plant based milk'),(88,'plums'),(89,'potatoes'),(71,'powdered sugar'),(2,'pumpkin puree'),(1,'pumpkin spice'),(47,'pure maple syrup'),(92,'qwe'),(31,'red onion'),(33,'red pepper'),(112,'red pepper flakes'),(40,'ripe bananas'),(11,'rolled oats'),(48,'russet potatoes'),(36,'salsa'),(60,'salt'),(72,'soy creamer'),(17,'soy milk'),(117,'star anise'),(57,'tahini paste'),(16,'test'),(42,'thick gluten-free rolled oats'),(50,'tofu bacon'),(25,'tortillas'),(96,'unsweetend desiccated coconut'),(43,'unsweetened desiccated coconut'),(4,'vanilla extract'),(52,'vegan block cheese'),(62,'vegan butter'),(107,'vegan ricotta cheese'),(53,'vegan sour cream'),(101,'vegetable broth'),(123,'very ripe bananas'),(63,'walnuts'),(61,'water'),(120,'whole cloves'),(118,'whole nutmeg'),(65,'whole wheat flour'),(91,'xsw'),(103,'yellow miso'),(99,'yellow onion');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipeId` int NOT NULL,
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `comment_id_idx` (`comment_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `likes_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`),
  CONSTRAINT `likes_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,1,1,2,'2023-11-10 21:55:19'),(2,8,5,2,'2023-11-10 21:58:18'),(3,67,9,2,'2023-11-10 21:59:47'),(4,66,8,2,'2023-11-10 21:59:54'),(5,1,1,3,'2023-11-10 22:00:55'),(6,1,10,3,'2023-11-10 22:00:56'),(7,3,2,3,'2023-11-10 22:01:02'),(8,5,11,3,'2023-11-10 22:01:12'),(9,7,4,3,'2023-11-10 22:02:10'),(10,8,12,3,'2023-11-10 22:02:21'),(11,64,7,3,'2023-11-10 22:04:32'),(12,66,8,3,'2023-11-10 22:05:13'),(13,67,14,3,'2023-11-10 22:05:54'),(14,67,9,3,'2023-11-10 22:05:54'),(15,2,15,1,'2023-11-10 22:06:17'),(16,5,11,1,'2023-11-10 22:06:28'),(17,7,16,1,'2023-11-10 22:06:37'),(18,8,12,1,'2023-11-10 22:06:48'),(19,10,18,1,'2023-11-10 22:06:51'),(20,65,13,1,'2023-11-10 22:07:00'),(21,67,21,1,'2023-11-10 22:07:07');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_directions`
--

DROP TABLE IF EXISTS `recipe_directions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_directions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `direction_step` int NOT NULL,
  `direction` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=593 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_directions`
--

LOCK TABLES `recipe_directions` WRITE;
/*!40000 ALTER TABLE `recipe_directions` DISABLE KEYS */;
INSERT INTO `recipe_directions` VALUES (1,1,1,'Preheat a griddle to 350 F. Add 1 tablespoon of coconut oil to the griddle and let it melt. If you don\'t have a griddle, simply preheat a large skillet over medium heat. Once hot, add coconut oil.'),(2,1,2,'In a blender combine the chickpea flour, pumpkin puree, plant based milk, vanilla, pumpkin spice and cinnamon. Blend until smooth.'),(3,1,3,'Pour the custard into a shallow dish and place sliced bread in the batter so that one side of the bread is completely submerged. Allow the batter to soak into the bread, 15-20 seconds, flip, and soak for another 15 seconds.'),(4,1,4,'Place the slices of bread on the hot pan and cook until each side is golden brown and speckled, about 2-3 minutes on each side. Repeat with the remaining slices of bread. Serve hot and top with maple syrup.'),(5,2,1,'Combine oats, milk, chia seeds, vanilla extract, salt and maple syrup in a large bowl. Stir together until well combined. Fold in fresh blueberries.'),(6,2,2,'Transfer to two 8 ounce mason jars, cover, and refrigerate at least 4 hours or overnight. When ready, top with desired toppings and enjoy!'),(7,3,1,'To begin, preheat the waffle maker according to the manufacturer\'s instructions.'),(8,3,2,'In a bowl, combine the flour, sugar, baking soda, baking powder and pinch of salt. In a separate bowl, whisk together the oil, non-dairy milk, and the vanilla extract. Add the wet to the dry ingredients and mix well, until most of the lumps are gone.'),(9,3,3,'Spray waffle iron with cooking oil. Pour the recommended amount (amounts will vary depending on your waffle iron) of batter onto the hot waffle iron, and cook until the waffle is golden brown on both sides.'),(10,3,4,'Serve immediately with desired toppings, such as fresh fruits and maple syrup.'),(11,4,1,'Preheat the oven to 350 degrees F.'),(12,4,2,'Begin by making scrambled eggs. Once done, transfer to a bowl and set aside.'),(13,4,3,'In the same skillet, heat 1 tablespoon of coconut oil. Add onions and sauté for 5 minutes, until tender and fragrant. Add garlic and red and green peppers, and continue cooking for another 5-7 minutes until peppers are tender. Add green chiles, cumin, black beans, and lime juice. Cook for about 3 more minutes. Stir in vegan scrambled eggs and remove from heat.'),(14,4,4,'Evenly divide the filling between the 6 wraps. Sprinkle with non-dairy cheese and roll up. Place on a baking sheet, seam side down, and bake for 20 minutes.'),(15,5,1,'Preheat the oven to 350. Lightly spray a 7x11 dish. A 9x9 square pan will work as well.'),(16,5,2,'Place the sliced bananas on the bottom of the dish. Top with ½ cup of blueberries (or berries of choice) and set aside.'),(17,5,3,'In a small bowl, combine the oats, coconut, baking powder, salt, and spices. In a separate bowl, whisk together the coconut milk, maple syrup, vanilla extract, and chia seeds.'),(18,5,4,'Evenly cover the bananas and blueberries with the oatmeal mixture. Slowly pour the wet ingredients over the oats so that the oats are evenly saturated. You may need to press down on the oats with your hands to fully saturate them.'),(19,5,5,'Bake for 40-45 minutes until top is golden brown and oatmeal is baked all the way through. There should be a slight wiggle to the oatmeal. Remove from oven and let cool 10 minutes before slicing.'),(20,5,6,'Serve with fresh berries, maple syrup, coconut, and pecans.'),(21,6,1,'Begin by marinating the tofu. In a bowl mix together the ingredients for the marinade. Cut the tofu into ¼\" strips and place in a shallow dish. Top with the marinade, making sure the tofu is completely covered and place in the refrigerator for at least 1 hour. While the tofu marinates, prepare the rest of the dish.'),(23,6,2,'Preheat the oven to 450F. Poke holes through the potatoes and microwave them for 8-9 minutes, until they are easily pierceable with a fork. Be careful not to overcook the potatoes or they will fall apart. Let cool for 10 minutes before cutting in half and carefully scooping out the flesh, leaving a ½\" shell.'),(24,6,3,'Brush the potato skins with two tablespoons of olive oil. Sprinkle with salt and pepper and bake for 20 minutes, flipping halfway through.'),(25,6,4,'While the potatoes bake, prepare the tofu and cheese sauce. Heat the remaining one tablespoons of oil in a large skillet, Once hot, add tofu and pan-fry for about 5 minutes per side, until browned and crispy. Remove from skillet and set aside.'),(26,6,5,'To make the cheese sauce, place non-dairy milk in a small saucepot over medium heat. Once simmering remove from heat and add the cheeze shreds. Stir constantly until the cheese is completely melted.'),(27,6,6,'Evenly divide the cheese sauce, adding about 2-3 tablespoons in each potato skin. Top with tofu bacon and cook for an additional 3-4 minutes until everything is heated all the way through. Remove from the oven and top with vegan sour cream and chives.'),(38,7,1,'Preheat the oven to 400F. Cut the cauliflower into small florets. Toss the cauliflower florets in 2 tablespoons of olive oil and spread evenly onto a large baking sheet. Bake for 20 minutes, stirring occasionally until the cauliflower is tender and cooked all the way through.'),(39,7,2,'Remove from the oven and transfer to a large food processor. Add the remaining ingredients and blend until very smooth, scraping down the sides as needed. You will need to add 2-4 tablespoons of water to reach desired consistency. Add 1 tablespoon at a time. Once you have smooth hummus, taste and adjust seasonings.'),(40,7,3,'Serve with desired toppings and crackers, pita, or vegetables.'),(41,8,1,'Preheat the oven to 350 degrees F. Spray or line with muffin holders a muffin pan and set aside.'),(42,8,2,'In a large bowl combine flour, baking soda, cinnamon, and salt. In another bowl, mash bananas with a fork. Add melted butter, both sugars, milk, and vanilla. Whisk to combine. Add the wet ingredients to dry and mix gently together until a uniform batter is formed. A few lumps are okay.  Fold in ¾ cup of the walnuts.'),(43,8,3,'Place batter in muffin tins, about ¾ full. Top with remaining walnuts and bake for 20-25 minutes until golden brown and a knife inserted in the middle comes out clean.'),(44,8,4,'Remove from oven and let cool 10 minutes in the muffin tin before moving to a cooling rack to cool completely.'),(45,8,5,'Store in an airtight container at room temperature for up to 5 days. '),(46,9,1,'Preheat the oven to 375F. Line a baking sheet with parchment paper or silicone baking mat and set aside.'),(47,9,2,'In a small bowl mix together soy milk and apple cider vinegar and let sit for 10 minutes to allow it to curdle.'),(48,9,3,'In a larger bowl combine flour, sugar, baking powder, baking soda, spices, and black tea. Cut in small chunks of butter and mix with hands or pastry cutter until small crumbs forms. Whisk in the applesauce to the soymilk mixture and pour into the dry ingredients, mixing until the dough is evenly hydrated.'),(49,9,4,'Flour the bottom of an 8\" cake pan and press dough evenly into the pan to shape. Flip onto a floured surface and cut into 8 equal pieces. Place scones on the prepared baking sheet. Brush with a light layer of remaining milk, sprinkle with sugar. Place in the freezer for 30 minutes to harden before baking. This ensures the scones keep their shape in the oven.'),(50,9,5,'Bake for 25 minutes, until golden. Remove from the oven and let cool slightly.'),(51,9,6,'While baking mix together ingredients for cinnamon glaze. It should be thick but pourable. Once scones are mostly cool, pour on glaze and serve!'),(52,10,1,'Start by making the crust. Preheat the oven to 350 degrees F. Line an 8x8 square baking pan with parchment paper and set aside.'),(53,10,2,'In a stand-up mixer with the paddle attachment, beat the butter, sugar, and lemon zest together until smooth and creamy. Add flour and mix until well incorporated. You should have a thick dough that holds together when pressed between your fingers.'),(54,10,3,'Press the dough into the prepared pan and bake for 20 minutes until light golden brown. Remove from the oven and let cool for at least 15 minutes.'),(55,10,5,'Pour the lemon curd into the cooled crust and bake for another 25-35 minutes until the lemon curd has set. It should have a slight wobble to it.'),(56,10,4,'Next, make the lemon curd filling. In a food processor combine the tofu, lemon juice, zest, and granulated sugar and process until smooth and creamy, scraping down the sides as necessary. Add the powdered sugar, cornstarch, and vanilla extract and process again until combined.'),(57,10,6,'Once cooked, remove from oven and let cool at room temperature for 20 minutes before placing them in the refrigerator to cool all the way. Don\'t skip this step. It is necessary for the lemon bars to set properly.'),(58,10,7,'Once set, dust with powdered sugar or candied lemon slices just before serving.'),(577,64,1,'In a small soup pot heat the coconut oil over medium heat. Add the onions and sauté until translucent and fragrant, about 8 minutes. Stir in the garlic and ginger and cook for another minute.'),(578,64,2,'Add the bok choy and tofu, stirring to coat. Pour in the vegetable broth and bring to a boil then reduce heat and let simmer for 5 minutes, until bok choy has wilted. Stir in the miso, spinach, and green onions and remove from heat.'),(579,64,3,'Serve immediately with hot sauce of choice and extra green onions.'),(580,65,1,'Preheat the oven to 375 ºF.'),(581,65,2,'Cook the pasta according to package directions. Cook until al dente. It\'s okay if the pasta is a little underdone; it will continue cooking in the oven. Once ready, drain the pasta and rinse it under cool water to stop the cooking.'),(582,65,4,'In a 13 x 9-inch baking dish add a couple of spoonfuls of the marinara sauce to the bottom of the dish. Add about ½ of the pasta and top with about half of the remaining tomato sauce. Next, sprinkle about ¼ cup of vegan ricotta over the top along with half of the garlic, pepper flakes, Italian seasoning, minced basil, salt, and pepper. Repeat and layer the remaining pasta, tomato sauce, ricotta cheese, and spices.'),(583,65,3,'Make the vegan ricotta cheese using your own recipe. My go-to brand is Kite Hill.'),(584,65,5,'Put the baking dish in the oven and bake for 25-30 minutes, or until the ricotta cheese has browned. Serve immediately. Garnish with fresh herbs if desired.'),(585,66,1,'Over medium-high heat, combine the water, tea bags, and spices in a medium-sized saucepan and bring to a boil. Boil for five minutes. Remove from heat and stir in maple syrup if using.'),(586,66,2,'Carefully pour hot water through a strainer, dividing it equally into two mugs so that just the tea concentrate remains. In the same saucepan, bring heat milk to scald (just before boiling point) then remove from heat.'),(587,66,3,'Transfer milk to your milk frother and pump up and down a few times until your milk is light a frothy. Tap the frother a few times on the counter to let the milk settle a bit.'),(588,66,4,'Top off each mug with milk. Sprinkle with cinnamon, garnish with a couple of star anise (optional) and enjoy immediately!'),(589,67,1,'Preheat the oven to 350F. Line a baking sheet with parchment paper and set aside.'),(590,67,2,'Place the bananas in a bowl and mash them with a potato masher or the back of a wooden spoon. Mash them until the bananas are mostly smooth. A few lumps are okay.'),(591,67,3,'Once the bananas are mashed, add the oats and peanut butter, stirring until everything is well combined. Fold in the chocolate chips. Taste and adjust. If the dough is too dry, add a little more peanut butter. If the dough feels too wet, add ¼ cup more oats.'),(592,67,4,'Drop bite-sized spoonfuls onto the prepared baking sheet and bake for 10-12 minutes. Until lightly brown. Let the cookies cool for 10 minutes on the baking sheet before transferring them to a wire cooling rack.');
/*!40000 ALTER TABLE `recipe_directions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_fractions`
--

DROP TABLE IF EXISTS `recipe_fractions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_fractions` (
  `id` int NOT NULL,
  `fraction` varchar(4) DEFAULT NULL,
  `fraction_decimal` decimal(5,4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fraction_UNIQUE` (`fraction`),
  UNIQUE KEY `fraction_decimal_UNIQUE` (`fraction_decimal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_fractions`
--

LOCK TABLES `recipe_fractions` WRITE;
/*!40000 ALTER TABLE `recipe_fractions` DISABLE KEYS */;
INSERT INTO `recipe_fractions` VALUES (1,'¾',0.7500),(2,'⅔',0.6666),(3,'½',0.5000),(4,'⅓',0.3333),(5,'¼',0.2500),(6,'⅛',0.1250),(7,'¹⁄₁₆',0.0625),(8,'',0.0000);
/*!40000 ALTER TABLE `recipe_fractions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `fraction_id` varchar(45) DEFAULT NULL,
  `unit_id` varchar(45) DEFAULT NULL,
  `ingredient_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredients`
--

LOCK TABLES `recipe_ingredients` WRITE;
/*!40000 ALTER TABLE `recipe_ingredients` DISABLE KEYS */;
INSERT INTO `recipe_ingredients` VALUES (1,1,'1','','','3'),(2,1,'','3','5','2'),(3,2,'1','','5','11'),(4,2,'','3','5','10'),(5,2,'','3','5','9'),(6,2,'1','','1','12'),(7,2,'1','','1','13'),(8,2,'1','','2','4'),(9,2,'','','','14'),(10,2,'1','','5','15'),(11,1,'1','','2','4'),(12,1,'1','','2','1'),(13,1,'1','','2','5'),(14,1,'','4','5','6'),(15,1,'1','3','5','7'),(16,1,'2','','1','8'),(17,3,'1','5','5','22'),(18,3,'','3','2','20'),(19,3,'','3','2','21'),(20,3,'','5','5','8'),(21,3,'1','','5','51'),(22,3,'2','','1','94'),(23,3,'1','','2','4'),(24,3,'','','','23'),(25,4,'6','','','25'),(26,4,'2','','','26'),(27,4,'1','','1','27'),(28,4,'','3','','31'),(29,4,'3','','','32'),(30,4,'','3','','33'),(31,4,'','3','','34'),(32,4,'','3','2','35'),(33,4,'','3','5','36'),(34,4,'','3','','34'),(35,4,'','3','2','35'),(36,4,'','3','5','36'),(37,4,'','5','5','37'),(38,4,'14','','3','95'),(39,4,'','','','29'),(40,5,'2','','','81'),(41,5,'1','','5','41'),(42,5,'2','3','5','42'),(43,5,'','5','5','96'),(44,5,'2','','2','20'),(45,5,'1','3','2','44'),(46,5,'','5','2','45'),(47,5,'','','','14'),(48,5,'14','','3','97'),(49,5,'','3','5','47'),(50,5,'2','','2','4'),(51,5,'2','','1','13'),(52,6,'5','','','48'),(53,6,'','','1','49'),(54,6,'8','','3','50'),(55,6,'','5','5','51'),(56,6,'7','','3','52'),(57,6,'','3','5','53'),(58,6,'5','','','54'),(59,6,'','','','30'),(60,6,'','','','38'),(61,7,'6','','5','56'),(62,7,'','5','5','55'),(63,7,'','5','5','57'),(64,7,'4','','1','49'),(65,7,'2','','1','59'),(66,7,'3','','','32'),(67,7,'1','','2','35'),(68,7,'','3','2','60'),(69,7,'3','','1','61'),(70,8,'1','3','5','22'),(71,8,'1','1','2','21'),(72,8,'','3','2','5'),(73,8,'','5','2','60'),(74,8,'4','','','40'),(75,8,'','3','5','62'),(76,8,'','3','5','24'),(77,8,'','5','5','64'),(78,8,'1','5','5','63'),(79,8,'','5','5','51'),(80,8,'1','','2','4'),(81,9,'1','3','5','22'),(101,10,'','3','5','62'),(102,10,'','5','5','24'),(103,10,'1','','2','74'),(104,10,'1','','5','22'),(105,10,'12','','3','76'),(106,10,'','3','5','75'),(107,10,'1','','2','74'),(108,10,'1','','5','71'),(109,10,'','5','5','71'),(121,10,'2','','1','78'),(122,10,'1','','2','4'),(208,4,'1','','5','39'),(209,4,'','','','30'),(210,4,'','','','38'),(211,9,'1','','5','65'),(212,9,'','5','5','24'),(213,9,'2','','1','24'),(214,9,'2','','2','20'),(215,9,'','3','2','21'),(216,9,'','3','2','60'),(217,9,'1','','1','69'),(218,9,'1','','2','5'),(219,9,'','3','2','70'),(220,9,'','5','2','98'),(221,9,'','6','2','67'),(222,9,'','3','5','62'),(223,9,'','5','5','68'),(224,9,'','3','5','17'),(225,9,'','3','2','73'),(226,9,'2','','1','62'),(227,64,'1','','1','8'),(228,64,'2','','','32'),(229,64,'','3','','99'),(230,64,'1','','1','100'),(231,64,'4','','5','101'),(232,64,'4','','','102'),(233,64,'2','','','105'),(234,64,'1','','1','103'),(235,64,'1','','','104'),(236,65,'12','','3','106'),(237,65,'','3','5','107'),(238,65,'3','3','5','108'),(239,65,'3','','','109'),(240,65,'1','3','2','60'),(241,65,'1','','1','110'),(242,65,'1','','1','111'),(243,65,'','3','2','112'),(244,65,'','3','2','113'),(245,66,'1','','5','61'),(246,66,'1','','1','12'),(247,66,'2','','','115'),(248,66,'4','','','114'),(249,66,'2','','','116'),(250,66,'2','','5','121'),(251,66,'2','','','117'),(252,66,'1','','','118'),(253,66,'','6','2','119'),(254,66,'','5','2','120'),(255,67,'1','3','5','122'),(256,67,'2','','','123'),(257,67,'','5','5','124'),(258,67,'','4','5','125');
/*!40000 ALTER TABLE `recipe_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_photos`
--

DROP TABLE IF EXISTS `recipe_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `photo_url` varchar(255) NOT NULL DEFAULT 'https://res.cloudinary.com/djq3aojia/image/upload/v1684366490/recipe_images/e3voacpzrkr7jns1ocx5.jpg',
  `file_name` varchar(255) DEFAULT 'recipe_images/e3voacpzrkr7jns1ocx5',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `recipe_id_idx` (`recipe_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `recipe_photo_recipe_id_idx` (`recipe_id`),
  KEY `recipe_photo_user_id_idx` (`user_id`),
  CONSTRAINT `recipe_photos_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT `recipe_photos_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_photos`
--

LOCK TABLES `recipe_photos` WRITE;
/*!40000 ALTER TABLE `recipe_photos` DISABLE KEYS */;
INSERT INTO `recipe_photos` VALUES (1,1,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698863889/recipe_images/wqsl7dtbez3i5c6deir7.jpg','recipe_images/wqsl7dtbez3i5c6deir7','2023-11-01 18:38:09'),(2,2,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698872395/recipe_images/kksknkkcofsugdve87tz.jpg','recipe_images/kksknkkcofsugdve87tz','2023-11-01 20:59:55'),(3,3,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698882951/recipe_images/pxixgcawm2tn2tawzsjb.jpg','recipe_images/pxixgcawm2tn2tawzsjb','2023-11-01 23:55:51'),(4,4,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698945507/recipe_images/qjxjt2hm9hjkvdfjmrvo.jpg','recipe_images/qjxjt2hm9hjkvdfjmrvo','2023-11-02 17:18:28'),(5,5,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698946238/recipe_images/d3pi8uyoipgxqwjsipj6.jpg','recipe_images/d3pi8uyoipgxqwjsipj6','2023-11-02 17:30:39'),(6,6,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698948357/recipe_images/klk9ai1g0xkcmjgp63w0.jpg','recipe_images/klk9ai1g0xkcmjgp63w0','2023-11-02 18:05:57'),(7,7,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698962512/recipe_images/y2fw2hn5tfb65auglzbc.jpg','recipe_images/y2fw2hn5tfb65auglzbc','2023-11-02 22:01:52'),(8,8,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698963536/recipe_images/de5egyrysvvm08rlddqi.jpg','recipe_images/de5egyrysvvm08rlddqi','2023-11-02 22:14:26'),(9,9,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698964188/recipe_images/gpqupzanw8vaxxi1zbid.jpg','recipe_images/gpqupzanw8vaxxi1zbid','2023-11-02 22:29:48'),(10,10,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1698965877/recipe_images/hbmkxplagjowsuxxxuql.jpg','recipe_images/hbmkxplagjowsuxxxuql','2023-11-02 22:57:57'),(11,64,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1699586240/recipe_images/jr9pymp4xg9fze054jx7.jpg','recipe_images/jr9pymp4xg9fze054jx7','2023-11-10 03:17:20'),(12,65,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1699586553/recipe_images/ayjoaj7vduxt5yucrcez.jpg','recipe_images/ayjoaj7vduxt5yucrcez','2023-11-10 03:22:33'),(13,66,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1699586973/recipe_images/bkpnthgtbrbtdhmidqwo.jpg','recipe_images/bkpnthgtbrbtdhmidqwo','2023-11-10 03:29:34'),(14,67,1,'https://res.cloudinary.com/djq3aojia/image/upload/v1699587205/recipe_images/jghjy7gh5qoh4gos8zjo.jpg','recipe_images/jghjy7gh5qoh4gos8zjo','2023-11-10 03:33:25');
/*!40000 ALTER TABLE `recipe_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ratings`
--

DROP TABLE IF EXISTS `recipe_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ratings_recipe_id_idx` (`recipe_id`),
  KEY `ratings_user_id_idx` (`user_id`),
  CONSTRAINT `ratings_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT `ratings_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ratings`
--

LOCK TABLES `recipe_ratings` WRITE;
/*!40000 ALTER TABLE `recipe_ratings` DISABLE KEYS */;
INSERT INTO `recipe_ratings` VALUES (1,1,1,5,'2023-11-10 20:12:40'),(2,2,1,5,'2023-11-10 20:13:31'),(3,6,1,4,'2023-11-10 20:31:30'),(4,5,1,5,'2023-11-10 20:36:38'),(6,64,1,5,'2023-11-10 20:36:53'),(7,66,1,5,'2023-11-10 20:37:02'),(8,67,1,3,'2023-11-10 20:37:12'),(9,1,2,5,'2023-11-10 20:37:45'),(10,3,2,4,'2023-11-10 20:37:51'),(11,5,2,4,'2023-11-10 20:38:01'),(12,6,2,5,'2023-11-10 20:38:29'),(13,7,2,4,'2023-11-10 20:38:34'),(14,8,2,5,'2023-11-10 20:38:40'),(15,10,2,4,'2023-11-10 20:38:47'),(16,64,2,5,'2023-11-10 20:38:52'),(17,65,2,5,'2023-11-10 20:38:57'),(18,66,2,5,'2023-11-10 20:39:02'),(19,67,2,4,'2023-11-10 20:39:08'),(20,2,3,4,'2023-11-10 20:39:35'),(21,3,3,5,'2023-11-10 20:39:39'),(22,5,3,4,'2023-11-10 20:39:53'),(23,7,3,4,'2023-11-10 20:40:01'),(24,8,3,4,'2023-11-10 20:40:07'),(25,10,3,4,'2023-11-10 20:40:10'),(26,64,3,5,'2023-11-10 20:40:19'),(27,66,3,5,'2023-11-10 20:40:27'),(28,67,3,5,'2023-11-10 20:40:30'),(29,7,1,1,'2023-11-10 21:02:58');
/*!40000 ALTER TABLE `recipe_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_units`
--

DROP TABLE IF EXISTS `recipe_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_units` (
  `id` int NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unit_UNIQUE` (`unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_units`
--

LOCK TABLES `recipe_units` WRITE;
/*!40000 ALTER TABLE `recipe_units` DISABLE KEYS */;
INSERT INTO `recipe_units` VALUES (10,''),(5,'cup'),(4,'fluid ounce'),(8,'gallon'),(9,'gram'),(3,'ounce'),(6,'pint'),(7,'quart'),(1,'tablespoon'),(2,'teaspoon');
/*!40000 ALTER TABLE `recipe_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `submit_user_id` int NOT NULL,
  `submit_user_first_name` varchar(45) NOT NULL,
  `submit_user_last_name` varchar(45) NOT NULL,
  `r_title` tinytext NOT NULL,
  `servings` tinyint NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prep_time` tinyint NOT NULL,
  `cook_time` tinyint NOT NULL,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `FormFullText` (`r_title`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,1,'Bryce','Richey','Pumpkin french toast',6,'This Vegan Pumpkin French Toast is even better without eggs. Made with chickpea flour and non-dairy milk, this vegan brunch recipe will certainly impress your family and friends. Made in under 30 minutes!','2023-11-01 18:38:09',5,15,'breakfast'),(2,1,'Bryce','Richey','Blueberry Overnight Oats',2,'These Blueberry Overnight Oats are made with a blend of coconut and almond milk for a sweet, refreshing, and creamy grab-n-go breakfast.','2023-11-01 20:59:55',10,4,'breakfast'),(3,1,'Bryce','Richey','Classic waffles',4,'Start your morning with these 15-minute classic vegan waffles. Crispy on the outside and soft on the inside. Serve with fresh fruits and top with maple syrup for a delightful weekend brunch.','2023-11-01 23:55:51',10,5,'breakfast'),(4,1,'Bryce','Richey','Southwest breakfast burrito',6,'This Southwest Vegan Breakfast Burrito is loaded with protein and vegetables and filled with flavor for a healthy, delicious breakfast. Keep them in the freezer for grab-n-go meals all week long. Made in under 30 minutes!','2023-11-02 17:18:28',20,20,'breakfast'),(5,1,'Bryce','Richey','Blueberry coconut baked oatmeal',8,'Start your day off with this delicious vegan and gluten-free baked oatmeal. Made with bananas, blueberries, and coconut for a sweet and creamy heart-healthy breakfast. Just 10 minutes of prep time!','2023-11-02 17:30:38',10,45,'breakfast'),(6,1,'Bryce','Richey','Potato skins with tofu bacon',10,'Classic Cheddar and Bacon Potato Skins turned vegan. You are going to fall in love with these 5 ingredient vegan potato skins. Serve them for a delicious and easy appetizer at your next family BBQ.','2023-11-02 18:05:57',20,25,'snacketizers'),(7,1,'Bryce','Richey','Hemp cauliflower hummus',8,'A creamy hemp cauliflower hummus bursting with flavor! You only need 8 ingredients to make this chickpea-free, low-carb, keto-friendly dip. Plus it can be made in just 30 minutes. Serve this dish with crackers, pita, or vegetables, and enjoy!','2023-11-02 22:01:52',30,0,'snacketizers'),(8,1,'Bryce','Richey','Banana walnut muffins',12,'Start your morning off right with these deliciously spiced, walnut filled, and perfectly flavored vegan Banana Nut Muffins. Get your house smelling heavenly in just 30 minutes.','2023-11-02 22:14:26',10,20,'baking'),(9,1,'Bryce','Richey','Chai spiced scones with cinnamon glaze',8,'You\'re going to love these vegan Chai Spiced Scones. Flaky, buttery, and spicy, and topped with a delicious cinnamon glaze, these are the perfect Autumnal vegan pastry. Make them for breakfast, afternoon snack, or even dessert; they will always be a hit!','2023-11-02 22:29:48',25,25,'baking'),(10,1,'Bryce','Richey','Lemon bars',9,'This recipe for vegan lemon bars is the best lemon recipe you\'ll ever try! Tart and sweet, these soft lemon bars are bright with citrus and dusted with powdered sugar. Family-friendly and simple to make, this recipe for easy lemon squares is simply amazing!','2023-11-02 22:57:57',30,60,'baking'),(64,1,'Bryce','Richey','Miso soup',2,'A healing and immune-boosting vegan miso soup full of flavor and packed with green veggies and sprouted tofu for a wholesome vegan and gluten-free meal. Make it in just 10 minutes!','2023-11-10 03:17:20',10,10,'soup'),(65,1,'Bryce','Richey','Baked ziti',6,'This incredibly easy vegan baked ziti recipe is made with creamy homemade ricotta, penne pasta, and savory marinara sauce for one of the best vegan pasta dishes around! Homemade baked ziti is great for whenever you want a quick and satisfying meal that will satisfy vegans and omnivores alike!','2023-11-10 03:22:33',30,30,'dinner'),(66,1,'Bryce','Richey','Chai tea latte',2,'Save money and learn how to make a Chai Tea Latte at home! A warm and spicy spiced tea blended with frothed milk for only a fraction of the price! Made in under 10 minutes.','2023-11-10 03:29:34',5,5,'drinks'),(67,1,'Bryce','Richey','Vegan cookies',12,'Healthy vegan cookies are made with just 4 ingredients - banana, oats, peanut butter, and chocolate chips for a quick and healthy snack you can feel great about giving the kids. Vegan and gluten-free!','2023-11-10 03:33:25',5,10,'dessert');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('Qsh_tLIP7ExPxBhbdeOECK3JKhaRIUaS',1699821876,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-11-12T00:36:36.362Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1}}'),('ZDOUWwb2r5OTsdBgXkdgDaCcx_7nrU11',1699749396,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-11-12T00:36:36.364Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isAdmin` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `u_person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bryce','Richey','bryce@byte.com','93dd6ab93e6f8a64e0cedaf834835bb9de1987633830e363278e85baa50202bec27c07403bd92f75e9fe3ede176e5a44ffa6687f8521f9c21d07f257b35ea13f','972578ccc1ff3ac53d433e36599cd08ad9cece1613de5d01ef8dd7bd2aab32f7','2023-02-07 19:37:35',1),(2,'Logan','Tomlin','logan@byte.com','58127f898337188efba6ed2b489b6638658545c88cbfb9a2a2fb9176d7639ddca8a862db45f94780ea0e1500b338043f9a36a0599875459e28c754c9311f293d','045bb3d4d2a244869fbe28a738e91a179627970215590a203960d56d8157cf47','2023-11-10 19:47:55',0),(3,'Jen','Taylor','jen@byte.com','76e3f44d126caf3b1002fe338e75176d90d199397ed6ae3b49d25e2dfff3888778e0e4a610066bcc085ec18c70485c86bf67e63ae184b97ed9dd9c577c63ef22','08e488a640c4ffdc9e4d0c8a4e6c876ec7cf8dcca2174e52177ed1c8ec15e107','2023-11-10 20:00:25',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-11 13:47:00
