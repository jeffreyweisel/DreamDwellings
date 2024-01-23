using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DreamDwellings.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HomeTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HomeTypeName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    IdentityUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Homes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HomeImage = table.Column<string>(type: "text", nullable: false),
                    StreetAddress = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    SquareFeet = table.Column<decimal>(type: "numeric", nullable: false),
                    BedNumber = table.Column<int>(type: "integer", nullable: false),
                    BathNumber = table.Column<decimal>(type: "numeric", nullable: false),
                    ListedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PurchasedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    UserProfileId = table.Column<int>(type: "integer", nullable: true),
                    Sold = table.Column<bool>(type: "boolean", nullable: true),
                    HomeTypeId = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Homes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Homes_HomeTypes_HomeTypeId",
                        column: x => x.HomeTypeId,
                        principalTable: "HomeTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Homes_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserSaves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    HomeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSaves_Homes_HomeId",
                        column: x => x.HomeId,
                        principalTable: "Homes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSaves_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "a8defec4-c0d5-40b8-9984-80803333380a", "Admin", "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "e0a35d64-ff51-4644-b569-d7274deb87c9", "phil@example.com", false, false, null, null, null, "AQAAAAEAACcQAAAAEHX9hohnCocVFS8ywUPd2fZkf6QD5gzztv8vNJJuD/MXikpSghC9qoqa0O3lE4R7hw==", null, false, "add298e2-41fe-4c70-8cde-55a0bfd2c731", false, "Administrator" });

            migrationBuilder.InsertData(
                table: "HomeTypes",
                columns: new[] { "Id", "HomeTypeName" },
                values: new object[,]
                {
                    { 1, "Single Family Home" },
                    { 2, "Condo" },
                    { 3, "Townhouse" },
                    { 4, "Apartment" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" });

            migrationBuilder.InsertData(
                table: "Homes",
                columns: new[] { "Id", "BathNumber", "BedNumber", "City", "Description", "HomeImage", "HomeTypeId", "ListedOn", "Price", "PurchasedOn", "Sold", "SquareFeet", "StreetAddress", "UserProfileId" },
                values: new object[,]
                {
                    { 1, 2m, 3, "Franklin", "Welcome to this charming 3-bedroom, 2-bathroom home offering 1500 sq ft of comfortable living space. This residence boasts a spacious interior, perfect for both relaxation and entertainment. The well-appointed bedrooms provide ample space for rest, while the inviting common areas create a warm and welcoming atmosphere. With its desirable features and prime location, this home presents an ideal opportunity for a new chapter of comfortable living.", "https://dhp.dreeshomes.com/cms/images/5vlwKrt_41I8s7yG-NZKFW?quality=80&width=1200", 1, new DateTime(2023, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 450000, null, false, 1500m, "123 Main St", null },
                    { 2, 2.5m, 4, "Franklin", "Step into luxury with this stunning 4-bedroom, 2.5-bathroom home spanning across 2000 sq ft of modern elegance. The well-designed layout offers spacious living areas and an upgraded kitchen perfect for culinary enthusiasts. Unwind in the generous bedrooms, including a master suite with a private bath. With its impressive features and generous square footage, this home provides an exceptional blend of comfort and style, making it an ideal retreat for you and your family.", "https://dhp.dreeshomes.com/cms/images/D-TyO6d0q1L9l-S5Jg6Ouw?quality=80&width=1200", 1, new DateTime(2023, 11, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 292000, null, false, 2000m, "456 Elm St", null },
                    { 3, 2m, 3, "Brentwood", "Discover the perfect harmony of space and comfort in this inviting 3-bedroom, 2-bathroom home spanning 1800 sq ft. The well-designed layout creates a seamless flow between living and sleeping areas, providing both functionality and charm. Enjoy the tranquility of a spacious master suite, and relish the convenience of a thoughtfully designed kitchen. With its cozy ambiance and desirable features, this home offers a wonderful haven for relaxation and everyday living.", "https://nhs-dynamic-secure.akamaized.net/Images/Homes/Drees/69096216-230623.jpg?maxwidth=900&maxheight=600&format=jpg&progressive=true", 1, new DateTime(2023, 12, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 399000, null, false, 1800m, "789 Oak St", null },
                    { 4, 3m, 4, "Brentwood", "Indulge in the spacious luxury of this captivating 4-bedroom, 3-bathroom home boasting an expansive 2200 sq ft floor plan. This residence is designed for both comfort and style, featuring generous bedrooms, including a lavish master suite with a private bath retreat. The open-concept living areas seamlessly connect, providing a perfect setting for gatherings and entertainment. With its impressive square footage and modern amenities, this home offers a blend of elegance and functionality, creating an inviting sanctuary for you and your family.", "https://www.hersindex.com/wp-content/uploads/2020/04/Drees-Austin-Header-scaled.jpg", 1, new DateTime(2023, 1, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 299000, null, false, 2200m, "101 Pine St", null },
                    { 5, 2.5m, 3, "Smyrna", "Welcome to this delightful 3-bedroom, 2.5-bathroom home offering 1600 sq ft of cozy and efficient living space. The thoughtfully designed layout features a bright and airy atmosphere, blending practicality with style. Relax in the comfortable bedrooms, including a charming master suite with a convenient ensuite bath. With its modest yet well-utilized square footage, this home provides a perfect balance of comfort and modern living, creating a warm and inviting retreat for you and your loved ones.", "https://www.dreeshomes.com/globalassets/production-ready/design---distinctive-design/lauren-ii-a_drees.jpg", 1, new DateTime(2023, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 305000, null, false, 1600m, "202 Maple St", null }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "FirstName", "IdentityUserId", "LastName" },
                values: new object[] { 1, "Phil", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", "Dunphy" });

            migrationBuilder.InsertData(
                table: "UserSaves",
                columns: new[] { "Id", "HomeId", "UserProfileId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 3, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Homes_HomeTypeId",
                table: "Homes",
                column: "HomeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Homes_UserProfileId",
                table: "Homes",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSaves_HomeId",
                table: "UserSaves",
                column: "HomeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSaves_UserProfileId",
                table: "UserSaves",
                column: "UserProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "UserSaves");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Homes");

            migrationBuilder.DropTable(
                name: "HomeTypes");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
