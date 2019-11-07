package geocluster

case class Point(x: Double, y: Double) {
  def +(that: Point) : Point =
    Point(this.x + that.x, this.y + that.y)

  def /(value: Double): Point =
    Point(this.x / value, this.y / value)

  def distance(that: Point): Double = {
    Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2))
  }
}

object Point {
  val zero = Point(0, 0)
}

class Cluster(val content: List[Point] = List()) {
  lazy val center: Option[Point] = {
    content match {
      case List() => None
      case _ =>
        val summAllPoints: Point = content.foldLeft(Point.zero)((p, sum) => p + sum)
        Some(summAllPoints / content.size)
    }
  }
}

class Geoclusterer(allEntities: List[Point], maxClusterSize: Int) {
  val clusters: List[Cluster] = {
    val allGroups = allEntities.grouped(maxClusterSize)
    allGroups.map { group: List[Point] => new Cluster(group) }.toList
  }
}
