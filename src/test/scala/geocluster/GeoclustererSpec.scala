package geocluster

import org.scalatest._

/*
https://towardsdatascience.com/the-5-clustering-algorithms-data-scientists-need-to-know-a36d136ef68

todo
-
 */

class GeoclustererSpec extends WordSpec with Matchers {
  "a cluster" should {
    "have no center" in {
      val cluster = new Cluster()
      cluster.center shouldBe None
    }

    "have a center" in {
      val cluster = new Cluster(List(Point(1, 24), Point(3, -4), Point(5, 4)))
      cluster.center shouldBe Some(Point(3, 8))
    }
  }

  "geoclustering" should {
    "return no cluster when the entity set is empty" in {
      val entitySet = List[Point]()
      val clusters: List[Cluster] = new Geoclusterer(entitySet, 1000).clusters
      clusters shouldBe List[Point]()
    }

    "return a cluster with one single entity" in {
      val entitySet = List[Point](Point(2, 3))
      val clusters: List[Cluster] = new Geoclusterer(entitySet, 1000).clusters

      // single cluster...
      clusters.size shouldBe 1

      // ...containing only one entity
      val clusterContent: List[Point] = clusters.toList(0).content
      clusterContent shouldBe entitySet
    }

    "return two clusters with one entity per cluster" in {
      val entitySet = List[Point](Point(2, 3), Point(5, -2))
      val clusters: List[Cluster] = new Geoclusterer(entitySet, 1).clusters

      clusters.size shouldBe 2
    }

    "return two cluster with two entity per cluster" in {
      val entitySet = List[Point](Point(2, 3), Point(3, 2), Point(5, -2), Point(4,-3))
      val clusters: List[Cluster] = new Geoclusterer(entitySet, 2).clusters
      clusters.size shouldBe 2

      clusters(0).content shouldBe List(Point(2, 3), Point(3, 2))
      clusters(1).content shouldBe List(Point(5, -2), Point(4,-3))
    }
  }
}

