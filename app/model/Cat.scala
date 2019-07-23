package model

import play.api.libs.json.Json

case class Cat(id:Long, nom: String, image: String, counter : Long) {

}

object Cat{
  implicit val writer = Json.writes[Cat]
  implicit val reader = Json.reads[Cat]
}
