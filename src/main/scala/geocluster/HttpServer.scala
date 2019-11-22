package geocluster

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer

import scala.io.StdIn

object HttpServer {
  def main(args: Array[String]): Unit = {
    implicit val system = ActorSystem("my-system")
    implicit val materializer = ActorMaterializer()
    implicit val executionContext = system.dispatcher

    val bindingFuture = Http().bindAndHandle(Router.route, "localhost", 8080)

    println("Press RETURN to stop...")

    StdIn.readLine()
    bindingFuture
      .flatMap(_.unbind())
      .onComplete(_ => system.terminate())
  }
}

object Router {
  def route: Route =
    path("hello") {
      get {
        complete(HttpEntity(ContentTypes.`application/json`,
          """{
            |  "entities":[
            |    {"id":"a0","location":{"x":0,"y":0}},
            |    {"id":"a1","location":{"x":3.2,"y":2}},
            |    {"id":"a2","location":{"x":6,"y":-2.1}},
            |    {"id":"a3","location":{"x":3.7,"y":0.2}},
            |    {"id":"a4","location":{"x":-7.9,"y":7.4}},
            |    {"id":"a5","location":{"x":4,"y":-6.2}},
            |    {"id":"a6","location":{"x":-22,"y":14}},
            |    {"id":"a7","location":{"x":13.8,"y":16}},
            |    {"id":"a8","location":{"x":-17,"y":-11}},
            |    {"id":"a9","location":{"x":17.7,"y":9}},
            |    {"id":"a10","location":{"x":-5.4,"y":9.2}},
            |    {"id":"a11","location":{"x":26,"y":-19}},
            |    {"id":"a12","location":{"x":-7.1,"y":10.9}},
            |    {"id":"a13","location":{"x":-18,"y":11.8}},
            |    {"id":"a14","location":{"x":-3.9,"y":24}},
            |    {"id":"a15","location":{"x":7.4,"y":22.7}}
            |  ]
            |}""".stripMargin))
      }
    }
}