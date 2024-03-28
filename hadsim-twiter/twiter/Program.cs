using System;
using System.CodeDom.Compiler;

namespace twiter
{
    public class Program
    {
        public enum Option
        {
            Square = 1, Triangular, Exit
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

                    case Option.Triangular:
                        CalculateShapeAreaOrPerimeter("Triangle");
                        break;

                    case Option.Exit:
                        Console.WriteLine("Exiting the program...");
                        break;

                    default:
                        Console.WriteLine("Invalid choice. Please try again.");
                        break;
                }
            } while (choice != Option.Exit);
        }

        public static void CalculateShapeAreaOrPerimeter(string shape)
        {
            int height, width;
            Console.WriteLine($"Enter the height of the {shape}:");
            int.TryParse(Console.ReadLine(), out height); // Parse the user input to an height
            Console.WriteLine($"Enter the width of the {shape}:"); // Parse the user input to an width
            int.TryParse(Console.ReadLine(), out width);
            if (shape == "Square")
            {
                if (height == width || Math.Abs(height - width) > 5)//Checks if the difference between the height and width is greater than five
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
                Console.WriteLine("2. Print Triangle ");
                string? choice = Console.ReadLine();
                if (choice == "2")
                {
                    printTriangle(height, width);
                }
                else if (choice == "1")
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

        public static void printTriangle(int height, int width)
        {
            if ((width % 2 == 0) || width > height * 2)
            {
                Console.WriteLine("ERROR this triangle cannot be printed");//בcheking if the input is valid 
                return;
            }
            else
            {
                
                string line1 = new string('*', width);//seting the last line 
                width = width / 2;
                string line = new string(' ', width);//seting the right spaces on the first line
                line += "*";//adding the *
                int lineNam;
                if ((width - 1) != 0)//edge cases when the width =3 
                {
                    lineNam = width - 1;  
                }
                else
                {
                    lineNam = width;
                }
                int numLine = ((height - 2) / lineNam); //seting the number of repeting the same line
                int sumLine = numLine * lineNam + 1;//seting the total lins to print in order to print the the rest of the linegi
                Console.WriteLine(line);
                for (int i = 0; i < lineNam; i++)
                {
                    line = line.Substring(1, width);
                    line += "**";
                    while (sumLine < height - 1)
                    {
                        Console.WriteLine(line);
                        sumLine++;
                    }
                    width += 1;
                    for (int j = 0; j < numLine; j++)
                        Console.WriteLine(line);
                }

                Console.WriteLine(line1);
            }

        }
    }
}
