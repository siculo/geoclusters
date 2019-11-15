import sbt._

object Dependencies {
  lazy val scalaTest = "org.scalatest" %% "scalatest" % "3.0.8" % Test

  lazy val akkaVersion = "2.6.0"
  lazy val akkaCore = "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion

  // lazy val akkaRemote = "com.typesafe.akka" %% "akka-remote" % akkaVersion
  // lazy val akkaCluster = "com.typesafe.akka" %% "akka-cluster-typed" % akkaVersion
  // lazy val akkaClusterSharding = "com.typesafe.akka" %% "akka-cluster-sharding-typed" % akkaVersion
  // lazy val akkaClusterSingleton = "com.typesafe.akka" %% "akka-cluster-singleton" % akkaVersion
  // lazy val akkaPersistence = "com.typesafe.akka" %% "akka-persistence-typed" % akkaVersion
  // lazy val akkaStreams = "com.typesafe.akka" %% "akka-stream-typed" % akkaVersion

  lazy val akkaHttp = "com.typesafe.akka" %% "akka-http" % "10.1.10"

  lazy val library = Seq(
    akkaCore,
    akkaHttp,
    scalaTest
  )
}
