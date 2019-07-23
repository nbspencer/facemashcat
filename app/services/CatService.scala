package services

import java.sql._

import anorm._
import postgresql._
import javax.inject._
import model.Cat
import play.api.db._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random

@Singleton
class CatService @Inject()
(implicit
 ec: ExecutionContext,
 db: Database) {
  val parser: RowParser[Cat] = Macro.namedParser[Cat]

  def findAll(): Future[List[Cat]] = {
    Future.successful(
      db.withConnection { implicit con: Connection =>
        SQL("select * from cat").as(parser.*)
      })
  }

  def findById(id: Long): Future[Cat] = {
    Future.successful(
      db.withConnection { implicit con: Connection =>
        println("boom 1")
        SQL(s"select * from cat where id = ${id}").as(parser.single)
      })
  }

  def incrementCounter(id: Long): Future[Cat] = {
    Future.successful(
      db.withConnection { implicit con: Connection =>
        val cat = SQL(s"select * from cat where id = ${id}").as(parser.single)

        val counter: Long = cat.counter + 1
        SQL(s"update cat " +
          s"set counter = ${counter} " +
          s"where id = ${id} ").executeUpdate()
        SQL(s"select * from cat where id = ${cat.id}").as(parser.single)
      }
    )
  }

  def findAllByIds(catsIds : List[Long]):Future[List[Cat]] = {
    Future.successful(
      db.withConnection { implicit con: Connection =>
        if(catsIds.isEmpty){
          SQL(s"select * from cat").as(parser.*)
        }else{
          val stringQuery: String = catsIds
            .map(catId => s"and id != $catId" )
            .mkString(" ")
          SQL(s"select * " +
            s" from cat " +
            s" where 1 = 1 " +
            s" $stringQuery ").as(parser.*)
        }
      })
  }
  def pickOneExceptThose(catsIds : List[Long]): Future[Cat] ={
    findAllByIds(catsIds).map{ cats =>
      getRandomElement(cats,new Random)
    }
  }

  def getRandomElement(cats : List[Cat], random: Random): Cat = {
    cats(random.nextInt(cats.length))
  }
}
