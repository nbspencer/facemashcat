package controllers

import javax.inject._
import model.Cat
import play.api.db.Database
import play.api.libs.json.{JsArray, JsError, JsSuccess}
import play.api.mvc._
import services.CatService

import scala.concurrent.{ExecutionContext, Future}
import scala.io.Source
import scala.reflect.io.File

@Singleton
class CatsController @Inject()
(cc: ControllerComponents)
(catsService: CatService)
(db: Database)
(implicit ec: ExecutionContext)
  extends AbstractController(cc) {


  def findAll = Action.async { request =>
    catsService.findAll().map { cats =>
      Ok(
        JsArray(cats.map(cat => Cat.writer.writes(cat)))
      )
    }
  }

  def incrementCounter = Action.async(parse.json(10 * 1024 * 1024)) { request =>
    Cat.reader.reads(request.body) match {
      case JsSuccess(value, path) => {
        catsService.incrementCounter(value.id).map { cat =>
          Ok(Cat.writer.writes(cat))
        }
      }
      case JsError(errors) => Future.successful(BadRequest("Probleme dans la requete"))
    }

  }

  def pickOneExceptThose = Action.async(parse.json) { request =>
        val res : JsArray = request.body.as[JsArray]
        val resLong : List[Long] = res.value.map(id => id.as[Long]).toList
        catsService.pickOneExceptThose(resLong).map{ cat => {
          Ok(
            Cat.writer.writes(cat)
          )
        }}
  }


  def addCat() = Action.async(parse.json(10 * 1024 * 1024)) { request =>

    val name =  (request.body \ "name").as[String]
    val image =  (request.body \ "image").as[String]

    catsService.add(name,image).map{
      case Right(cat) => {
        Ok(Cat.writer.writes(cat))
      }
      case Left(error) => {
        BadRequest(s"probleme dans la requete : $error")
      }
    }
  }
}
