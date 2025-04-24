import { NextResponse } from "next/server";
// Import Status enum and Prisma namespace
import { PrismaClient, doorone,doortwo,doorthree,windows, Category, Product, Prisma } from "@prisma/client"; // Added Status

// Initialize Prisma Client
const prisma = new PrismaClient({
  // Optional: Enable logging for debugging
  // log: ['query', 'info', 'warn', 'error'],
});

// --- Configuration ---
// Set based on your Product model for price filtering and sorting
const PRICE_FIELD_NAME: keyof Product = 'discountprice'; // Field for filtering/sorting price

export async function GET(req: Request) {
  console.log(`\n--- New API Request ---`);
  console.log(`Request URL: ${req.url}`);

  try {
    const { searchParams } = new URL(req.url);

    // --- Read Parameters ---
    const search = searchParams.get("search") || "";
    let categoryone = searchParams.get("category1");
    let categorytwo = searchParams.get("category2");
    let categorythree = searchParams.get("category3");
    let categoryfour = searchParams.get("category4");
    const categoryParam = searchParams.get("category");
    const statusParam = searchParams.get("status"); // Read status
    const sortFilter = searchParams.get("sort");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const isPremiumParam = searchParams.get("ispremium"); // Read ispremium

    console.log(`first : Raw Params: search='${search}', category='${categoryParam}', category1 = '${categoryone}' , category2 = '${categorytwo}' , category3 = '${categorythree}' , category4 = '${categoryfour}', status='${statusParam}', sort='${sortFilter}', minPrice='${minPriceParam}', maxPrice='${maxPriceParam}', ispremium='${isPremiumParam}'`);


  
    
    if (categoryParam === "Doors") {
      categoryfour = "none";
    } else if (categoryParam === "Windows") {
      categoryone = "none";
      categorytwo = "none";
      categorythree = "none";
    }

    console.log(`two  : Raw Params: search='${search}', category='${categoryParam}', category1 = '${categoryone}' , category2 = '${categorytwo}' , category3 = '${categorythree}' , category4 = '${categoryfour}', status='${statusParam}', sort='${sortFilter}', minPrice='${minPriceParam}', maxPrice='${maxPriceParam}', ispremium='${isPremiumParam}'`);

    let products: Product[] = [];

    // --- Price Parsing (for Int field) ---
    let minPrice: number | null = null;
    let maxPrice: number | null = null;
    if (minPriceParam) {
      const parsedMin = parseInt(minPriceParam, 10);
      if (!isNaN(parsedMin)) {
        minPrice = parsedMin;
      } else {
        console.warn(`Invalid minPrice parameter received: '${minPriceParam}'`);
      }
    }
    if (maxPriceParam) {
      const parsedMax = parseInt(maxPriceParam, 10);
      if (!isNaN(parsedMax)) {
        maxPrice = parsedMax;
      } else {
        console.warn(`Invalid maxPrice parameter received: '${maxPriceParam}'`);
      }
    }
    console.log(`Parsed Integer Prices: minPrice=${minPrice}, maxPrice=${maxPrice}`);

    // --- isPremium Parsing (for Boolean field) ---
    let isPremium: boolean | null = null;
    if (isPremiumParam) {
      if (isPremiumParam.toLowerCase() === 'true') {
        isPremium = true;
      } else if (isPremiumParam.toLowerCase() === 'false') {
        isPremium = false;
      } else {
        console.warn(`Invalid ispremium parameter received: '${isPremiumParam}'. Expected 'true' or 'false'.`);
      }
    }
    console.log(`Parsed Boolean isPremium: isPremium=${isPremium}`);

    // --- Query Execution ---
    if (search) {
      // --- Full-Text Search ---
      console.log(`Executing full-text search for: "${search}"`);
      products = await prisma.$queryRaw<Product[]>`
          SELECT *
          FROM "Product"
          WHERE to_tsvector('english', name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('english', ${search})
          ORDER BY ts_rank(to_tsvector('english', name || ' ' || COALESCE(description, '')), plainto_tsquery('english', ${search})) DESC
          LIMIT 100;
        `;
      console.log(`FTS Query returned ${products.length} products.`);

    } else {
      // --- Filtered & Sorted Query using findMany (No Search) ---

      // 1. Build the WHERE clause dynamically
      const whereClause: Prisma.ProductWhereInput = {};

      // Add subcategory filter if valid
      if (categoryone && Object.values(doorone).includes(categoryone as doorone) && categoryone !== "none") {
        whereClause.category1 = categoryone as doorone;
        console.log(`Applied filter: subcategory = ${categoryone}`);
      } else if (categoryone) {
        console.warn(`Invalid subcategory value '${categoryone}' provided and ignored.`);
      }

      if (categorytwo && Object.values(doortwo).includes(categorytwo as doortwo) && categorytwo !== "none") {
        whereClause.category2 = categorytwo as doortwo;
        console.log(`Applied filter: subcategory = ${categorytwo}`);
      } else if (categorytwo) {
        console.warn(`Invalid subcategory value '${categorytwo}' provided and ignored.`);
      }

      if (categorythree && Object.values(doorthree).includes(categorythree as doorthree) && categorythree !== "none") {
        whereClause.category3 = categorythree as doorthree;
        console.log(`Applied filter: subcategory = ${categorythree}`);
      } else if (categorythree) {
        console.warn(`Invalid subcategory value '${categorythree}' provided and ignored.`);
      }

      if (categoryfour && Object.values(windows).includes(categoryfour as windows) && categoryfour !== "none") {
        whereClause.category4 = categoryfour as windows;
        console.log(`Applied filter: subcategory = ${categoryfour}`);
      } else if (categoryfour) {
        console.warn(`Invalid subcategory value '${categoryfour}' provided and ignored.`);
      }




      // Add category filter if valid
      if (categoryParam && Object.values(Category).includes(categoryParam as Category) && categoryParam !== 'none') {
        whereClause.category = categoryParam as Category;
        console.log(`Applied filter: category = ${categoryParam}`);
      } else if (categoryParam && categoryParam !== 'null') { // Ignore 'null' string silently
        console.warn(`Invalid category value '${categoryParam}' provided and ignored.`);
      }

      // Add isPremium filter if valid
      if (isPremium !== null) {
        whereClause.ispremium = isPremium;
        console.log(`Applied filter: ispremium = ${isPremium}`);
      }

      // Build price conditions only if minPrice or maxPrice is valid
      const priceConditions: Prisma.IntFilter = {};
      if (minPrice !== null) {
        priceConditions.gte = minPrice;
      }
      if (maxPrice !== null) {
        priceConditions.lte = maxPrice;
      }

      // Add price conditions to the main where clause IF they exist
      if (Object.keys(priceConditions).length > 0) {
        // Assign directly using the known field name from the schema
        whereClause.discountprice = priceConditions;
        // Log using the actual field name
        console.log(`Applied filter: discountprice = ${JSON.stringify(priceConditions)}`);
      } else {
        console.log(`No valid price range filter applied.`);
      }

      // 2. Build the ORDER BY clause dynamically
      let orderByClause: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[] = { createdAt: 'desc' }; // Default sort

      switch (sortFilter) {
        case 'price_asc':
          orderByClause = { [PRICE_FIELD_NAME]: 'asc' }; // Use constant for dynamic key
          break;
        case 'price_desc':
          orderByClause = { [PRICE_FIELD_NAME]: 'desc' }; // Use constant for dynamic key
          break;
        case 'name_asc':
          orderByClause = { name: 'asc' };
          break;
        case 'name_desc':
          orderByClause = { name: 'desc' };
          break;
        case 'latest':
        default:
          orderByClause = { createdAt: 'desc' };
          break;
      }
      console.log("Applying orderBy:", JSON.stringify(orderByClause));

      // 3. Execute the findMany query
      console.log("Executing findMany with where clause:", JSON.stringify(whereClause));
      try {
        products = await prisma.product.findMany({
          where: whereClause,
          orderBy: orderByClause,
          // take: 20
        });
        console.log(`findMany Query returned ${products.length} products.`);
      } catch (prismaError) {
        console.error("Prisma findMany Error:", prismaError);
        throw prismaError;
      }
    }

    // --- Format Response ---
    // Assuming discountprice, stars, originalprice are Int based on previous schema
    const formattedProducts = products.map((product) => ({
      ...product,
      // No specific formatting needed for Int -> number
    }));

    console.log(`Returning ${formattedProducts.length} formatted products.`);
    return NextResponse.json(formattedProducts, { status: 200 });

  } catch (error) {
    console.error("--- API Request Failed ---");
    console.error("Error fetching products:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    if (error instanceof Error && error.stack) {
      console.error("Stack Trace:", error.stack);
    }
    return NextResponse.json({ error: "Failed to fetch products", details: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect()
      .then(() => console.log("Prisma client disconnected."))
      .catch(async (e) => {
        console.error("Failed to disconnect Prisma client:", e);
      });
    console.log("--- API Request End ---");
  }
}