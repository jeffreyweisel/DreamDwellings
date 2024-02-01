using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DreamDwellings.Migrations
{
    public partial class AddUserProfileProfilePicture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture",
                table: "UserProfiles",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Homes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "b5e5f747-eac7-46d8-9412-e15e48fd1bcb");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5527d647-6ddd-4c5e-bf8a-9d248b4b822e", "AQAAAAEAACcQAAAAEAJCfNfYLwj3fxCyqHn9j31vKwZKwYAe7cdMXdC9QdIC+BJoTruH81oUBDif4R/G1g==", "1acea930-da34-4e05-8203-a877306de3b9" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "UserProfiles");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Homes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                column: "ConcurrencyStamp",
                value: "a8defec4-c0d5-40b8-9984-80803333380a");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e0a35d64-ff51-4644-b569-d7274deb87c9", "AQAAAAEAACcQAAAAEHX9hohnCocVFS8ywUPd2fZkf6QD5gzztv8vNJJuD/MXikpSghC9qoqa0O3lE4R7hw==", "add298e2-41fe-4c70-8cde-55a0bfd2c731" });
        }
    }
}
