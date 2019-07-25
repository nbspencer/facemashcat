package model

import play.api.libs.json.{JsPath, Json, Reads}

case class Cat(id:Long, name: String, image: String, counter : Long) {

}

object Cat{
  implicit val writer = Json.writes[Cat]
  implicit val reader = Json.reads[Cat]

}
