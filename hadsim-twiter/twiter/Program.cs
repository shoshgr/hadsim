using System;
namespace twiter
{
  

    public class Program
    {
        public enum Option
        {
            Square=1, Triangular, Exit
        }
        public static void Main()
        {
            Option choice;
            do
            {
                Console.WriteLine("Please enter your choice:");
                Console.WriteLine("1. Square");
                Console.WriteLine("2. Triangular");
                Console.WriteLine("3. Exit");
                string? input = Console.ReadLine();

                // Parse the user input to an Option enum
                Option.TryParse(input, out choice);
                
                Console.WriteLine(choice);

                switch (choice)
                {
                    case Option.Square:
                        CalculateShapeAreaOrPerimeter("Square");
                        break;

                    //case Option.Triangular:
                    //    CalculateShapeAreaOrPerimeter("Triangle");
                    //    break;

                    case Option.Exit:
                        Console.WriteLine("Exiting the program...");
                        break;

                    default:
                        Console.WriteLine("Invalid choice. Please try again.");
                        break;
                }
            } while (choice != Option.Exit);
        }

        public static void printTriangle(double height, double width) { 
        }

        public static void CalculateShapeAreaOrPerimeter(string shape)
        {
            double height, width;
            Console.WriteLine($"Enter the height of the {shape}:");
            height = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine($"Enter the width of the {shape}:");
            width = Convert.ToDouble(Console.ReadLine());

            if (shape == "Square")
            {
                if (height == width && Math.Abs(height - width) == 5)
                {
                    double area = height * width;
                    Console.WriteLine($"Area of the {shape}: {area}");
                }
                else
                {
                    double perimeter = 2 * (height + width);
                    Console.WriteLine($"Perimeter of the {shape}: {perimeter}");
                }
            }
            else if (shape == "Triangle")
            {
                Console.WriteLine("Please enter your choice:");
                Console.WriteLine("1. Calculate Triangle Perimeter");
                Console.WriteLine("2. print Triangle ");
                string ?choice = Console.ReadLine();
                if (choice == "1")
                {
                    
                }
                else if (choice == "2")
                {
                    double perimeter = width + 2 * Math.Sqrt(Math.Pow(height, 2) + Math.Pow(width / 2, 2));
                    Console.WriteLine($"Perimeter of the {shape}: {perimeter}");
                }
                else
                {
                    Console.WriteLine("Invalid choice. Please try again.");
                }
            }
        }
    }
}