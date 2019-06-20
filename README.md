# My Dive into GraphQL and Prisma

## What is GraphQl?
+ GraphQL is a new API standard that provides a more efficient and powerful alternative to REST
+ It enables declarative data fetching. The client can specify the data it wants to fetch
+ Instead of multiple endpoints, the GraphQL API exposes a single endpoint and sends back precisely the data being requested 

## More effiecint than REST 
+ With increased mobile usage there was a need for a more efficient method for loading data
+ There are now a variety of front end frameworks and platforms, so there was a need for an API that can fulfill the requirements for all. GraphQL makes this easier. One fetch, and you get specific data.
+ Continuous deployment and fast development speed

## lil History 
+ Used by Facebook since 2012 
+ Was publicly discussed in 2015 

## Better Than REST 
+ No more over- or under-fetching data. You get the exact data you ask for!! Much more efficient 
+ Insightful analytics in the backend. Since that being fetched is sepcific, you can get analytics on what data is being requested and what data doesn't get anymore love from the clients 
+ Schema and Type-based system makes it easier for front end and back end development to work seperately because they have a definite structure for the data. 

 ## GraphQL Subscriptions 
 + Graphql subscriptions send realtime data to clients when a sepcific event occurs.
 + Client sends a subscrition query that specfies which event they want updates on.

## Prisma subscriptions 
+ Prisma xcomes with out-of-the-box support for subscriptions
+ For each model in your prisma datamodel, prisma lets you subscribe to these events using the * $subscribe * method
  1. the model is <!--! created -->
  2. the model is <!--! updated -->
  3. the model is <!--! deleted -->


## Building GraphQl servers with Prisma 
+ CLIENT <-----> API SERVER{Prisma Client} <-----> PRISMA SERVER <-----> DATABASE 
+ You are builing an API that will impliment a Prisma client that is the key to accessing the database. 
+ The prisma client in your API consumes the Prisma API and let's you easily connect your resolvers to the database

## Filtering, Pagination & Sorting
+ Filtering:
    + thanks to Prisma, you’ll be able to implement filtering capabilities to your API without major effort. Similar to the previous chapters, the heavy-lifting of query resolution will be performed by the powerful Prisma engine. All you need to do is forward incoming queries to it.
    + The first step is to think about the filters you want to expose through your API. In your case, the feed query in your API will accept a filter string. The query then should only return the Link elements where the url or the description contain that filter string.
+ Pagination:
    + Pagination is a tricky topic in API design. On a high-level, there are two major approaches regarding how it can be tackled:

    + Limit-Offset: Request a specific chunk of the list by providing the indices of the items to be retrieved (in fact, you’re mostly providing the start index (offset) as well as a count of items to be retrieved (limit)).
        + Here we are implementing limit-offset pagination:
            + Limit and offset are called differently in the Prisma API:

            + The *limit* is called *first*, meaning you’re grabbing the first x elements after a provided start index. Note that you also have a last argument available which correspondingly returns the last x elements.
            + The *start* index is called *skip*, since you’re skipping that many elements in the list before collecting the items to be returned. If skip is not provided, it’s 0 by default. The pagination then always starts from the beginning of the list (or the end in case you’re using last).

    + Cursor-based: This pagination model is a bit more advanced. Every element in the list is associated with a *unique ID *(the cursor). Clients paginating through the list then provide the cursor of the starting element as well as a count of items to be retrieved.
    + Prisma supports both pagination approaches
+ Sorting:
    + 



### Done 
+ Node.js, graphql-yoga and Prisma.

+ graphql-yoga is a fast and simple GraphQL server library built on top of Express.js. It comes with several features, such as out-of-the-box support for GraphQL Playgrounds and realtime GraphQL subscriptions.

+ The resolvers of your GraphQL server are implemented using the Prisma client that’s responsible for database access.