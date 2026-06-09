def get_int(prompt_text):
    while True:
        try:
            return int(input(prompt_text))
        except ValueError:
            # Re-loops without crashing if the input isn't an integer
            pass

while True:
    height = get_int("Height: ")
    if height > 0 and height < 9:
        break

for row in range(1, height + 1):
    spaces = height - row

    # Print amount of spaces on the left hand side for row
    for space_count in range(spaces):
        print(' ', end='')

    # Print left row of bricks
    for left_row in range(row):
        print('#', end='')

    # Print 2 spaces in between walls
    print('  ', end='')

    # Print right row of bricks
    for right_row in range(row):
        print('#', end='')

    # Add line break for next row
    print()