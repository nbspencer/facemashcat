name := """facemashcat"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.0"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.3" % Test
libraryDependencies += "org.postgresql" % "postgresql" % "42.2.6"
libraryDependencies += jdbc
libraryDependencies ++= Seq(
  "org.playframework.anorm" %% "anorm" % "2.6.4"
)
libraryDependencies ++= Seq(
  "org.playframework.anorm" %% "anorm-postgres" % "2.6.4"
)
// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.example.binders._"
